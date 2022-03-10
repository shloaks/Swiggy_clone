import { useEffect, useState } from "react";
import "./styles.css";

function RestaurantCard({ data }) {
  const {
    delivery_time,
    food_types,
    isExlusive,
    name,
    price_for_two,
    ratings,
  } = data;

  return (
    <>
      <div className="_1HEuF">
        <div className="_3FR5S">
          <div className="efp8s">
            <img
              className="_12_oN _2tuBw"
              src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=500&q=60"
              height="160px"
              width="254px"
            />
          </div>
          <div className="_3Ztcd">
            <div className="nA6kb">{name}</div>
            <div className="_1gURR">{food_types.join(", ")}</div>
          </div>
          <div className="_3Mn31">
            {ratings != "" ? (
              <>
                <div className="_9uwBC wY0my">
                  <span className="icon-star _537e4"></span>
                  <span>{ratings}</span>
                </div>
                <div>•</div>
              </>
            ) : (
              ""
            )}

            <div>{delivery_time}</div>
            <div>•</div>
            <div>&#x20b9;{price_for_two} FOR TWO</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantCard;
