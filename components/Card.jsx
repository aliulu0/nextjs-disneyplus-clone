import Image from "next/image";
import React from "react";
import NotFoundImage from '../public/images/imageNotFound.jpg';

import { useRouter } from "next/router";

function Card({ item, className }) {
  const router = useRouter();
  const IMG_BASE_URL = "https://www.themoviedb.org/t/p/original";
  return (
    <div
      className={className}
      onClick={() => {
        item.media_type === "movie"
          ? router.push(`/movies/${item?.id}}`)
          : router.push(`/series/${item?.id}}`);
      }}
    >
    {
      
      <Image
        src={
          !!item?.poster_path || !!item?.poster_path ? 
          `${IMG_BASE_URL}${item?.poster_path}` ||
          `${IMG_BASE_URL}${item?.backdrop_path}`: NotFoundImage
        }
        width={300}
        height={250}
        alt="item"
      /> 
    }
    </div>
  );
}

export default Card;
