import React from "react";
import {data as data_all} from "../../public/games/all_shop.json"
import Marquee from "react-fast-marquee";
import styles from './marquee.module.css'
import {SwiperSlide} from "swiper/react";
import CartBackground from "@/components/swiper/cartbackground";


const MarqueeSlide = () => {
  return (
    <>
      <Marquee className={styles.marguee} style={{marginBottom: '100px'}}>
        {data_all.slice(0, 50).map(data => {
          return (
            <div className={styles.marquee_item}>
              <img src={`${data.picture_url}`} loading="lazy" alt={`${data.name}`}/>
              <p>{data.name}</p>
            </div>
          )
        })}
      </Marquee>
    </>
  )
}

export default MarqueeSlide