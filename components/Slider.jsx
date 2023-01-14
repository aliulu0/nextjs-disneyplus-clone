import React from "react";
import styles from "../styles/Slider.module.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import slide1 from '../public/images/slide1.jpeg'
import slide2 from '../public/images/slide2.jpeg'
import slide3 from '../public/images/slide3.jpeg'
import slide4 from '../public/images/slide4.jpeg'
import Image from "next/image";
function Slider() {
 
 const slidesArr = [
  {img:slide1}, {img:slide2},{img:slide3}, {img:slide4}]
  return (
    <Carousel className={styles.carousel}
    autoPlay
    dynamicHeight
    infiniteLoop
    showIndicators={true}
    showStatus={false}
    showThumbs={false}
    centerMode
    swipeable
    centerSlidePercentage={95}
    emulateTouch
    stopOnHover
    autoFocus={false}
    useKeyboardArrows={true}
    >
      {slidesArr.map((slide, index) => (
        <div key={index} className={styles.wrap}>
          <Image src={slide.img} alt="movie" />
        </div>
      ))}
    </Carousel>
  );
}

export default Slider;
