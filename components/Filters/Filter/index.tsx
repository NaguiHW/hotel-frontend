import { MouseEventHandler } from "react";

interface ButtonData {
  text: any;
  value: string;
}

const Filter = ({
  containerStyle,
  buttonStyle,
  title,
  textArray,
  handleClick,
} : {
  containerStyle: string;
  buttonStyle: string;
  title: string;
  textArray: ButtonData[];
  handleClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div className={containerStyle}>
    <h3>{title}</h3>
    {
      textArray.map(item => (
        <button
          type='button'
          className={buttonStyle}
          onClick={handleClick}
          value={item.value}
          key={item.value}
        >
          {item.text}
        </button>
      ))
    }
  </div>
);

export default Filter;