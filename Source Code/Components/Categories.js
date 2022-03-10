import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import "./styles.css";

const Categories = React.forwardRef(({ category, restaurants }, ref) => {
  const [index, setIndex] = useState(0);
  const [indexedRestaurants, setIndexedRestaurants] = useState([]);
  const [next, setNext] = useState(0);
  const elementsPerPage = 5;

  useEffect(() => {
    setRestaurantsTobeShown(index);
  }, [index]);

  const setRestaurantsTobeShown = (i) => {
    const startIndex = elementsPerPage * i;
    const endIndex = elementsPerPage * (i + 1);
    endIndex < restaurants.length
      ? setNext(restaurants.length - endIndex)
      : setNext(false);

    setIndexedRestaurants(restaurants.slice(startIndex, endIndex));
  };

  return (
    <div ref={ref} id={category.replaceAll(" ", "")}>
      <div className="categoryHeader">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>

      <div className="row">
        {indexedRestaurants.map((data) => {
          return <RestaurantCard data={data} />;
        })}
        {next ? (
          <div onClick={() => setIndex(index + 1)} className="_1HEuF">
            {"+" + next + " more"}
          </div>
        ) : (
          <div className="_1HEuF"></div>
        )}
      </div>
    </div>
  );
});

export default Categories;
