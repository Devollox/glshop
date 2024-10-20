import {Autoplay, FreeMode, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import React from "react";
import styles from './swipercart.module.css'
import ImageCart from "@/components/swipercart/imagecart";
import DescriptionCart from "@/components/swipercart/descriptioncart";
import TitleCart from "@/components/swipercart/titlecart";

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
          {data.slice(0, 15).map((data: { external_data: { region: string | number; platform: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; product_details: { value: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }; picture_url: any; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; old_price: any | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; price: any | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; price_in_gold: any; }) => {
            return (
              <>
                <SwiperSlide>
                  <ImageCart data={data} />
                  <DescriptionCart data={data} />
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