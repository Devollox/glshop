import React from "react";
import SwiperDesktop from "./typeswiper/desktop";
import SwiperMobile from "./typeswiper/mobile";
import useWindowSize from "../../hook/useWindowsSize";
import styles from './slider.module.css'
import 'swiper/css/effect-fade'


const Swiper = () => {
  const size = useWindowSize();

  return (
    <>
      <div className={styles.wrapper_slider}>
        <div className={styles.slider}>
          <div className={styles.container}>
            {size.width <= 832 ? <SwiperMobile />: <SwiperDesktop />}
          </div>
        </div>
      </div>
    </>
  )
}

/* Swipper.js uses TypeScript very poorly. Then correct the error on line 47  */
export default Swiper