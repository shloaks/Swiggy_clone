import "./Components/styles.css";
import { useEffect, useState, useRef } from "react";
import Categories from "./Components/Categories";
import RestaurantCard from "./Components/RestaurantCard";

function App() {
  const [data, setData] = useState([]);
  const [activeItem, setActiveItem] = useState("popularbrands");
  const [tab, setTab] = useState("");
  const categoriesRef = {
    popularbrands: useRef(null),
    offersnearyou: useRef(null),
    Expressdelivery: useRef(null),
    Gourmet: useRef(null),
  };

  useEffect(() => {
    (async () =>
      await fetch("http://cdn.adpushup.com/reactTask.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
        }))();
  }, []);

  useEffect(() => {
    if (
      activeItem != "" &&
      activeItem != "seeAll" &&
      activeItem != "exclusive"
    ) {
      // var element = document.getElementById(activeItem);
      // element.scrollIntoView({
      //   behavior: "smooth",
      //   block: "end",
      //   inline: "nearest",
      // });

      console.log(activeItem, categoriesRef[activeItem]);
      if (categoriesRef[activeItem].current) {
        categoriesRef[activeItem].current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeItem]);

  const scrollCategoryIntoView = (category) => {
    setTab("");
    setActiveItem(category.replaceAll(" ", ""));
    // if (categoriesRef[activeItem].current) {
    //   categoriesRef[activeItem].current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "nearest",
    //   });
    // }
  };

  const getRestaurants = (exclusiveOnly) => {
    let res = [];
    data.forEach((e) => {
      e.restaurantList.forEach((restaurant) => {
        if (exclusiveOnly) {
          if (restaurant.isExlusive) {
            res.push(restaurant);
          }
        } else {
          res.push(restaurant);
        }
      });
    });
    return res;
  };

  return (
    <>
      <div className="_29kDH _3pFoM">
        <div className="sidebar">
          {data.map(({ category, restaurantList }) => {
            return (
              <>
                <div
                  onClick={() => scrollCategoryIntoView(category)}
                  className={
                    activeItem == category.replaceAll(" ", "")
                      ? "sidebarItem sidebarItemActive"
                      : "sidebarItem"
                  }
                >
                  <div className="sidebarItemHeader">{category}</div>
                  <div>{restaurantList.length + " Options"}</div>
                </div>
              </>
            );
          })}
          <div
            onClick={() => {
              setTab("exclusive");
              setActiveItem("exclusive");
            }}
            className={
              activeItem == "exclusive"
                ? "sidebarItem sidebarItemActive"
                : "sidebarItem"
            }
          >
            <div className="sidebarItemHeader">Only on Swiggy</div>
            <div>{getRestaurants(true).length + " Options"}</div>
          </div>
          <div
            onClick={() => {
              setTab("seeAll");
              setActiveItem("seeAll");
            }}
            className={
              activeItem == "seeAll"
                ? "sidebarItem sidebarItemActive"
                : "sidebarItem"
            }
          >
            <div className="sidebarItemHeader">See All</div>
            <div>{getRestaurants(false).length + " Options"}</div>
          </div>
        </div>
        {tab == "" ? (
          <div className="_1LV_f">
            <div className="container">
              <div className="restaurantsContainer">
                {data.length === 0 ? (
                  <h1>Loading...</h1>
                ) : (
                  data.map(({ category, restaurantList }) => {
                    return (
                      <Categories
                        key={category}
                        category={category}
                        restaurants={restaurantList}
                        ref={categoriesRef[category.replaceAll(" ", "")]}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="_1LV_f">
            <div className="container">
              <div className="restaurantsContainer">
                <div className="row">
                  {tab == "seeAll"
                    ? getRestaurants().map((data) => {
                        return <RestaurantCard data={data} />;
                      })
                    : getRestaurants(true).map((data) => {
                        return <RestaurantCard data={data} />;
                      })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
