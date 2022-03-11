import type { NextPage } from 'next'
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import axios from '../functions/axios';
import Banner from '../components/Banner';
import Filters from '../components/Filters';
import Hotels from '../components/Hotels';
import Router from 'next/router';

interface Hotel {
  id: number;
  name: string;
  category: number;
  price: number;
  photos: string;
}

const Home: NextPage = () => {
  const [hotels, setHotels] = useState<Hotel[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"all"|"asc"|"desc"|"cat-1"|"cat-2"|"cat-3"|"cat-4"|"cat-5"|"rat-1"|"rat-2"|"rat-3"|"rat-4"|"rat-5">("all")

  const getHotels = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'get',
        url: '/hotel'
      });

      setHotels(response.data);
      setLoading(false);
    } catch (error) {
      setHotels([]);
      console.error(error);
      setLoading(false);
    }
  };

  const getHotelsOrderByPrice = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'get',
        url: `/hotel/orderByPrice/${filter}`
      });
  
      setHotels(response.data);
      setLoading(false);
    } catch (error) {
      setHotels([]);
      console.error(error);
      setLoading(false);
    }
  };

  const getHotelsByCategory = async () => {
    try {
      setLoading(true);
      const value = filter.split("-")[1];

      const response = await axios({
        method: 'post',
        url: '/hotel/filterBy',
        data: {
          type: 'category',
          value,
        }
      });

      setHotels(response.data);
      setLoading(false);
    } catch (error) {
      setHotels([]);
      console.error(error);
      setLoading(false);
    }
  };

  const getHotelsByQualification = async () => {
    try {
      setLoading(true);
      const value = filter.split("-")[1];

      const response = await axios({
        method: 'post',
        url: '/hotel/filterBy',
        data: {
          type: 'qualification',
          value,
        }
      });
      
      setHotels(response.data);
      setLoading(false);
    } catch (error) {
      setHotels([]);
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (e: { target: any; }) => {
    if (e.target.value !== filter) {
      setFilter(e.target.value);
    } else {
      setFilter("all");
    }
  };

  const redirectAdmin = () => {
    Router.push('/admin');
  };

  useEffect(() => {
    if (filter === "all") {
      getHotels();
    }
    if (filter === "asc" || filter === "desc") {
      getHotelsOrderByPrice();
    }
    if (filter === "cat-1" || filter === "cat-2" || filter === "cat-3" || filter === "cat-4" || filter === "cat-5") {
      getHotelsByCategory();
    }
    if (filter === "rat-1" || filter === "rat-2" || filter === "rat-3" || filter === "rat-4" || filter === "rat-5") {
      getHotelsByQualification();
    }
  }, [filter]);

  return (
    <>
      <Banner title='Rate Your Hotel!' styles={styles.banner} admin={redirectAdmin} />
      <div className={styles.body}>
        <Filters
          filters={styles.filters}
          orderByPrice={styles.orderByPrice}
          upDownButton={styles.upDownButton}
          selectCategory={styles.selectCategory}
          buttonNumbers={styles.buttonNumbers}
          filterByRating={styles.filterByRating}
          handleClick={handleFilter}
        />
        {
          loading
            ? (
              <div className={styles.loadingContainer}>
                <ReactLoading type="bubbles" color="#6E7E85" height={667} width={375} />
              </div>
            ) : (
              hotels!.length > 0 ? <Hotels hotels={hotels}/> : <h2 className={styles.errorMessage}>We could not find hotels with those characteristics &#128534;</h2>
            )
        }
      </div>
    </>
  );
};

export default Home
