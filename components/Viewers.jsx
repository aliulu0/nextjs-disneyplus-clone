import React from "react";
import styles from "../styles/Viewers.module.css";
import disneyImg from "../public/images/disney.png";
import pixarImg from "../public/images/pixar.png";
import marvelImg from "../public/images/marvel.png";
import starwarsImg from "../public/images/starwars.png";
import nationalImg from "../public/images/national.png";

import Image from "next/image";
function Viewers() {
  const viewArr = [
    {
      img: disneyImg,
      video: "/videos/disney.mp4",
    },
    {
      img: pixarImg,
      video: "/videos/pixar.mp4",
    },
    {
      img: marvelImg,
      video: "/videos/marvel.mp4",
    },
    {
      img: starwarsImg,
      video: "/videos/star-wars.mp4",
    },
    {
      img: nationalImg,
      video: "/videos/national-geographic.mp4",
    },
  ];
  return (
    <div className={styles.container}>
      {viewArr.map((item, index) => (
        <div key={index} className={styles.content}>
          <Image src={item.img} alt="views" />
          <div className={styles.contentVideo}>
            <video  autoPlay loop={true} playsInline={true} src={item.video}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Viewers;
