import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../../styles/HotelCard.module.scss";
import { formatUrl } from "../../../functions/formatUrl";

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

  useEffect(() => {
    formatUrl(hotel.photos, setUrl);
  }, []);

  return (
    <Link href={`/hotel/${hotel.id}`}>
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
    </Link>
  )
};

export default HotelCard;
