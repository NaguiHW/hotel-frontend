import HotelCard from "./HotelCard";
import styles from "../../styles/Hotels.module.scss";

interface Hotel {
  id: number;
  name: string;
  category: number;
  price: number;
  photos: string;
}

const Hotels = ({
  hotels
}:{
  hotels: Hotel[] | [] | undefined;
}) => (
  <div className={styles.hotelsContainer}>
    {
      hotels!.map(hotel => (
        <HotelCard hotel={hotel} />
      ))
    }
  </div>
);

export default Hotels;
