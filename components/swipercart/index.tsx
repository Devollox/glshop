import {Autoplay, FreeMode, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import React from "react";
import styles from './swipercart.module.css'
import ImageCart from "@/components/swipercart/imagecart";
import DescriptionCart from "@/components/swipercart/descriptioncart";
import TitleCart from "@/components/swipercart/titlecart";
import Link from "next/link";

interface PropsSwiperCart {
  title?: string | undefined
  data?: any
}

const SwiperCart: React.FC<PropsSwiperCart> = ({title, data}) => {
  return (
    <>
      <div className={styles.wrapper_swiper} style={{marginTop: '50px'}}>
        <TitleCart title={title}  />
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="swiper_cart"
        >
          {data.slice(0, 15).map((data: { external_data: { app_id: any; }; }) => {
            return (
              <>
                <SwiperSlide>
                  <Link style={{textDecoration: 'none'}} href={`${data.external_data.app_id}`}>
                    <ImageCart data={data} />
                    <DescriptionCart data={data} />
                  </Link>
                </SwiperSlide>
              </>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}

export default SwiperCart