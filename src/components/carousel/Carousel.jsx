import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";


const Carousel = ({ data, loading , endPoint, title}) => {

  const carouselContainer = useRef(); //it works as a query selector to select an element
//   console.log(carouselContainer.current);

  const {url} = useSelector((state) => state.home);

  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    //console.log(container);

    //below 20px is padding given to the container in scss
    const scrollAmount = dir === "left"
     ? container.scrollLeft - 
     (container.offsetWidth + 20)
     : container.scrollLeft +
      (container.offsetWidth + 20);

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
      });
  };

  const skItem = () => {
     return (
        <div className="skeletonItem">
            {/* below skeleton class is added in index.scss file for animation purpose */}
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
     )
  }

  return (
    // <div ref={carouselContainer}>Carousel</div>
    <div className="carousel">
        <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}

            <BsFillArrowLeftCircleFill
               className="carouselLeftNav arrow"
               onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
               className="carouselRighttNav arrow"
               onClick={() => navigation("right")}
            />
            {!loading ? (
                   <div className="carouselItems"
                    ref={carouselContainer}
                    //with the help of ref we move the posters on desktop on left or right using left and right arrow
                  >
                     {data?.map((item) => {
                      //console.log(item);
                      //console.log(item.genre_ids);
                       const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;

                        return (
                            <div 
                            key={item?.id} 
                            className="carouselItem"
                            onClick={() =>
                                 navigate(`/${item?.media_type || endPoint}/${item?.id}`)
                                }
                            >
                                <div className="posterBlock">
                                    <Img src={posterUrl}/>
                                    <CircleRating
                                     rating={item.vote_average.toFixed(1)}
                                    />
                                    {/* below item.genre_ids is an array of ids which will have more than 3 id's ie more but we want only 2 id's as we
                                    want to show only two types of genres for each poster that's why we have used slice() */}
                                    <Genres
                                     data={item.genre_ids.slice(0,2)}
                                    />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name }
                                    </span>
                                    <span className="date">
                                        {dayjs(item.
                                            release_date).format("MMM D, YYYY")}
                                    </span>
                                </div>
                            </div>
                        )
                     })}
                  </div>
            ) : (
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel