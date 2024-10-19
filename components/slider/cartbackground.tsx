import React from "react";
import styles from './slider.module.css'
import {data as data} from "../../public/games/config.json"
import Link from "next/link";


interface Props {
  title: string;
  alt: string;
  img: string;
  description: string;
  exclusive: string;
  children?: React.ReactNode;
}

const CartBackground: React.FC<Props> = ({title, alt, img, description, exclusive, children}) => {
  const gamesTags = data.find(item => item.idImg === `${img}`)?.tag;

  return (
    <>
      <div className={styles.wrapper_cart}
           style={{position: 'fixed', zIndex: 2, height: '100%', width: '100%',}}>
        <div className="wrapper_container">
          <div className={styles.banner_carousel_slide_tags}>
            <div className="margin_flex_img" style={{display: 'flex'}}>
              <img
                style={{borderRadius: '12px'}}
                alt={alt}
                title={title}
                className={styles.banner_carousel_slide_logo}
                src={`/games/${img}/logo.webp`}/>
            </div>
            <div className="margin_flex_content">
              <div style={{marginBottom: '20px', display: 'flex'}}>
                <div className={styles.wrappper_items}>
                  {exclusive === "true" ? (
                      <p className={styles.flex_items_center_exclusive}>
                        Экзклюзив
                      </p>
                    ) :
                    <>
                    </>
                  }
                  {gamesTags?.map(data => {
                    return (
                      <>
                        {`${data}` === "Steam" ? (
                            <p className={styles.flex_items_center}>
                              <img className={styles.steam_logo} src="/games/steam/smalllogo.webp" alt="/"/> <a
                              style={{marginLeft: '25px'}}>{data}</a>
                            </p>
                          ) :
                          <p className={styles.flex_items_center}>
                            {data}
                          </p>
                        }
                      </>
                    )
                  })}
                </div>
              </div>
              <p className={styles.banner_carousel_slide_title_text}>{title}</p>
              <p className={styles.banner_carousel_slide_description}>{description}</p>
              <Link style={{textDecoration: 'none'}} href={`/${img}`}>
                <span className={styles.banner_carousel_slide_link}>Купить</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <img
        style={{borderRadius: '12px'}}
        alt={alt}
        title={title}
        src={`/games/${img}/background.webp`}></img>
    </>
  )
}

export default CartBackground