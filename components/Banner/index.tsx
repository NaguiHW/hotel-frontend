const Banner = ({
  title, styles
} : {
  title: string;
  styles: string;
}) => (
  <div className={styles}>
    <h1>Rate your Hotel!</h1>
  </div>
);

export default Banner;
