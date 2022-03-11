import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from '../../../styles/Hotel.module.scss';
import axios from "../../../functions/axios";
import ReactLoading from 'react-loading';
import { formatUrl } from "../../../functions/formatUrl";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { generateLast15Days, last15Days } from "../../../functions/generateLast15Days";
import moment from "moment";

interface Hotel {
  id: number;
  name: string;
  category: number;
  price: number;
  photos: string;
  average_rating: number;
};

interface Serie {
  name: string;
  data: number[]
}

const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
);

const Hotel = () => {
  const router = useRouter();
  const { id } = router.query;

  const [hotel, setHotel] = useState<Hotel[]>([]);
  const [hotels, setHotels] = useState<Hotel[] | []>([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [series, setSeries] = useState<Serie[]>([]);

  let options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Rating from last 15 days',
      align: 'center'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: generateLast15Days(),
    }
  };

  const firstLoad = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `/hotel/${id}`
      });

      formatUrl(response.data[0].photos, setUrl);
      setHotel(response.data);

      const hotels = await axios({
        method: 'get',
        url: '/hotel'
      });

      setHotels(hotels.data);

      const average = await axios({
        method: 'get',
        url: `/average_qualification/${id}`
      });

      const data: number[] = [];

      if (average.data.length === 15) {
        average.data.map((value: { rating: number; }) => (
          data.push(value.rating)
        ));

        setSeries([...series, {
          name: response.data[0].name,
          data,
        }])
      } else {
        const last15 = last15Days();

        for (let i = 0; i < last15.length; i++) {
          for (let j = 0; j < average.data.length; j++) {
            const currentDate = moment(average.data[j].date).format('DD')
            if (last15[i] === currentDate) {
              data.push(average.data[j].rating);
              i++;
            } else {
              data.length === 0 ? data.push(0) : data.push(data[data.length -1]);
              j--;
              i++;
            }
          }
        }

        setSeries([...series, {
          name: response.data[0].name,
          data,
        }])
      }

      setLoading(false);
    } catch (error) {
      setHotel([]);
      console.error(error);
      setLoading(false);
    }
  };

  const loadAverageRating = async (variable: any) => {
    try {
      const average = await axios({
        method: 'get',
        url: `/average_qualification/${variable}`
      });

      const data: number[] = [];

      if (average.data.length === 15) {
        average.data.map((value: { rating: number; }) => (
          data.push(value.rating)
        ));

        setSeries([...series, {
          name: hotels[variable - 1].name,
          data,
        }])
      } else {
        const last15 = last15Days();

        for (let i = 0; i < last15.length; i++) {
          for (let j = 0; j < average.data.length; j++) {
            const currentDate = moment(average.data[j].date).format('DD')
            if (last15[i] === currentDate) {
              data.push(average.data[j].rating);
              i++;
            } else {
              data.length === 0 ? data.push(0) : data.push(data[data.length -1]);
              j--;
              i++;
            }
          }
        }

        setSeries([...series, {
          name: hotels[variable - 1].name,
          data,
        }])
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAverage = (e: { target: any; }) => {
    loadAverageRating(e.target.value);
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      firstLoad();
    }
  }, [id]);

  return loading
    ? (
      <div className={styles.loadingContainer}>
        <ReactLoading type="bubbles" color="#6E7E85" height={667} width={375} />
      </div>
    ) : (
      hotel!.length > 0
        ? (
          <>
            <div className={styles.hotelContainer}>
              <Image src={url} width="300px" height="300px" />
              <div className={styles.data}>
                <h3>{hotel![0].name}</h3>
                <h4>Category: {[...Array(hotel![0].category)].map(() => <span>&#11088;</span>)}</h4>
                <h4>Price per night: ${hotel![0].price.toFixed(2)}</h4>
                <h4>Average rating: {[...Array(hotel![0].average_rating)].map(() => <span>&#11088;</span>)}</h4>
              </div>
            </div>
            <Chart options={options} series={series} type="line" height={350} />
            <div className={styles.compareArea}>
              <h3>Compare with other hotels</h3>
              <div className={styles.hotelsNameContainer}>
                {
                  hotels.map(hotel => (
                    <button type="button" className={styles.hotelName} key={hotel.id} value={hotel.id} onClick={handleAverage}>{hotel.name}</button>
                  ))
                }
              </div>
            </div>
          </>
        ) : (
          <h1>Sorry we couldn't find this hotel</h1>
        )
    )
};

export default Hotel;
