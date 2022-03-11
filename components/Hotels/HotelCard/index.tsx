import { useEffect, useState } from "react";
import styles from "../../../styles/HotelCard.module.scss";

interface Hotel {
  id: number;
  name: string;
  category: number;
  price: number;
  photos: string;
}

const HotelCard = ({
  hotel
} : {
  hotel: Hotel
}) => {
  const [url, setUrl] = useState('');
  const formatUrl = () => {
    const link = hotel.photos.split("'")[1];

    setUrl(link);
  };

  useEffect(() => {
    formatUrl();
  }, []);

  return (
    <div className={styles.hotelCard}>
      <div className={styles.imageContainer}>
        <img src={url} alt={hotel.name} />
      </div>
      <div className={styles.data}>
        <h3>{hotel.name}</h3>
        <h4>Category: {[...Array(hotel.category)].map(() => <span>&#11088;</span>)}</h4>
        <h4>Price per night: ${hotel.price.toFixed(2)}</h4>
      </div>
    </div>
  )
};

export default HotelCard;
