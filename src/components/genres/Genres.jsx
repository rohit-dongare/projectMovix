import React from 'react'
import "./style.scss";
import { useSelector } from 'react-redux';

//used in Carousel.jsx file
const Genres = ({data}) => {

 
    const { genres } = useSelector((state) => state.home);
   //console.log(genres)
   //console.log(data)

  return (
    <div className='genres'>
        {data?.map((g) => {
            if (!genres[g]?.name) return;//if the id of the genre is not present
            return (
                <div key={g} className="genre">
                    {genres[g]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres