import { MouseEventHandler } from "react";

const Banner = ({
  title,
  styles,
  admin,
} : {
  title: string;
  styles: string;
  admin: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div className={styles}>
    <button onClick={admin}>Admin</button>
    <h1>{title}</h1>
  </div>
);

export default Banner;
