import React, {useRef, useState} from "react";
import {Swiper, SwiperSlide, SwiperClass, SwiperRef} from 'swiper/react';
import {Autoplay, EffectFade, FreeMode, Navigation, Pagination, Thumbs} from "swiper/modules";
import CartButton from "./cartbutton"
import CartBackground from "./cartbackground";
import { data as data } from "../../public/games/config.json"
import styles from './slider.module.css'
import 'swiper/css/effect-fade'


const Slider = () => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState()

  return (
    <>
      <div className={styles.wrapper_slider}>
        <div className={styles.slider}>
          <div className={styles.container}>
            <Swiper
              autoplay={{
                disableOnInteraction: false,
              }}
              fadeEffect={{
                crossFade: true,
              }}
              allowTouchMove={false}
              speed={2000}
              slidersPerView={1}
              effect={"fade"}
              thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
              modules={[Thumbs, Autoplay, EffectFade, Pagination]}
              className="swiper_main"
            >
              {data.map(data => {
                return (
                  <SwiperSlide>
                    <CartBackground exclusive={data.exclusive} alt={data.title} title={data.title} img={data.idImg} description={data.description}>
                    </CartBackground>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <Swiper
              direction={'vertical'}
              onSwiper={setThumbsSwiper}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper_button"
            >
              {data.map(data => {
                return (
                  <SwiperSlide>
                    <CartButton alt={data.title} title={data.title} img={data.idImg} />
                  </SwiperSlide>
                )
              })}
            </Swiper>

              <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                autoplay={{
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="swiper_main_mobail swiper_main"
              >
                {data.map(data => {
                  return (
                    <SwiperSlide>
                      <CartBackground exclusive={data.exclusive} alt={data.title} title={data.title} img={data.idImg} description={data.description}>
                      </CartBackground>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

/* Swipper.js uses TypeScript very poorly. Then correct the error on line 47  */
export default Slider