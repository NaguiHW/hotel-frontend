import { MouseEventHandler } from "react";
import Filter from "./Filter";

const Filters = ({
  filters,
  orderByPrice,
  upDownButton,
  selectCategory,
  buttonNumbers,
  filterByRating,
  handleClick,
} : {
  orderByPrice: string;
  upDownButton: string;
  filters: string;
  selectCategory: string;
  buttonNumbers: string;
  filterByRating: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div className={filters}>
    <Filter
      containerStyle={orderByPrice}
      buttonStyle={upDownButton}
      title="Order by price:"
      textArray={[
        {
          text: "↓",
          value: "desc",
        },
        {
          text: "↑",
          value: "asc"
        }
      ]}
      handleClick={handleClick}
    />
    <Filter
      containerStyle={selectCategory}
      buttonStyle={buttonNumbers}
      title="Select category:"
      textArray={[
        {
          text: 1,
          value: "cat-1"
        },
        {
          text: 2,
          value: "cat-2"
        },
        {
          text: 3,
          value: "cat-3"
        },
        {
          text: 4,
          value: "cat-4"
        },
        {
          text: 5,
          value: "cat-5"
        }
      ]}
      handleClick={handleClick}
    />
    <Filter
      containerStyle={filterByRating}
      buttonStyle={buttonNumbers}
      title="Filter by rating:"
      textArray={[
        {
          text: 1,
          value: "rat-1",
        },
        {
          text: 2,
          value: "rat-2",
        },
        {
          text: 3,
          value: "rat-3",
        },
        {
          text: 4,
          value: "rat-4",
        },
        {
          text: 5,
          value: "rat-5",
        }
      ]}
      handleClick={handleClick}
    />
  </div>
);

export default Filters;
