import Page from "@/components/page";
import TapBar from "@/components/tapbar";
import React, {useEffect, useState} from "react";
import styles from '../../components/catalog/catalog.module.css'
import Error from "@/components/error";
import MainContent from "@/components/maincontent";
import ProductTag from "@/components/catalog/producttag";
import response from "@/public/games/all_shop.json";
import Link from "next/link";
import ProductDescription from "@/components/catalog/productdescription";
import useCalculateDiscount from "@/hook/useCalculateDiscount";
import stylesCoin from "@/components/swipercart/swipercart.module.css";
import {CartItem, cartService} from "@/service/cartservice";

interface Props {
  catalog?: any
}

const PageCatalog: React.FC<Props> = ({catalog}) => {
  if (!catalog || !catalog.external_data) {
    return <Error status={404} />;
  }

  const isPreOrderAvailable = catalog.tags.some((tag: { ru_name: string; }) => tag.ru_name === 'Предзаказы');
  const isRegion: any = { "Весь мир": true, "Россия+СНГ": true, "Россия": true, };
  const foundGames = response.data.filter((game) => game.name.toLowerCase().includes(catalog.name.toLowerCase()));

  interface CartItem {
    slug?: string;
    name?: string;
    price?: any;
    old_price?: any;
    picture_url?: string;
    price_in_gold?: any;
    for_sale?: boolean;
    h1_title?: string;
    product_type?: string;
    region?: string;
    platform?: string;
    app_id?: string;
    value?: any;
  }

  const handleAddToCart = () => {
    const cartData: CartItem = {
      slug: catalog.slug,
      name: catalog.name,
      price: catalog.price,
      picture_url: catalog.picture_url,
      old_price: catalog.old_price,
      price_in_gold: catalog.price_in_gold,
      for_sale: catalog.for_sale,
      h1_title: catalog.external_data.h1_title,
      product_type: catalog.external_data.product_type,
      region: catalog.external_data.region,
      platform: catalog.external_data.platform,
      app_id: catalog.external_data.app_id,
      value: catalog.external_data.product_details.value,
    };

    cartService.addToCart(cartData);
  };

  return (
    <Page title={catalog.name}>
      <MainContent height={"100%"} margin={"100px 0 0 0"}>
        <div className={styles.wrapper_catalog_slug}>
          <div className={styles.catalog} style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className={styles.image}>
              <div className={styles.image_container}>
                <img src={catalog.picture_url} alt={catalog.name}/>
              </div>
            </div>
            <div className={styles.main_info_title}>
              <h1>
                <span>
                  {catalog.external_data.h1_title}
                </span>
              </h1>
              <div className={styles.main_info_tags}>
                {isPreOrderAvailable && (
                  <ProductTag
                    alt={"No Image"}
                    src={'/is-preorder.svg'}
                    title={'Предзаказ'}
                    text={'Доставка в день релиза'}
                    tags={false}/>
                )}
                <ProductTag
                  alt={"No Image"}
                  src={`/games/public_logo_games/${catalog.external_data.platform}.svg`}
                  title={`Платформа`}
                  text={`${catalog.external_data.platform}`}
                  tags={false}/>
                {isRegion[catalog.external_data.region] == true ?
                  <>
                    <ProductTag
                      alt={"No Image"}
                      src={`/games/public_logo_flags/tag-flag.webp`}
                      title={`Территория активации`}
                      text={`Доступно в РФ`}
                      tags={true}/>
                  </>
                  : <></>}
              </div>
              <div className={`${styles.main_info_chips} ${styles.chips}`}>
                <div className={styles.chips_header}>
                  <span>Платформа:</span> {catalog.external_data.platform}
                </div>
                <div className={styles.chips_list}>
                  {Array.from(new Set(
                    foundGames
                      .map(game => game.external_data.platform)))
                    .map((dataFilter) => {
                      const isActive = dataFilter === catalog.external_data.platform;
                      const gameData: any = foundGames.find(game => game.external_data.platform === dataFilter);
                      return (
                        <div className={`${styles.tags_item} ${isActive ? styles.chips_list_active : ''}`}
                             key={dataFilter}>
                          <Link className={styles.tags_items} href={`/catalog/${gameData.slug}`}>
                            {dataFilter}
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className={`${styles.main_info_chips} ${styles.chips}`}>
                <div className={styles.chips_header}>
                  <span>Издание:</span> {catalog.external_data.product_details.value}
                </div>
                <div className={styles.editions_list}>
                  <div className={styles.chips_list}>
                    {Array.from(new Set(
                      foundGames
                        .filter(game => game.external_data.platform === catalog.external_data.platform)
                        .map(game => game.external_data.product_details.value)
                    )).map(dataFilter => {
                      const game = foundGames.find(data => data.external_data.product_details.value === dataFilter && data.external_data.platform === catalog.external_data.platform);
                      const isActive = dataFilter === catalog.external_data.product_details.value;

                      return (
                        <div className={`${styles.tags_item} ${isActive ? styles.chips_list_active : ''}`}
                             key={dataFilter}>
                          <Link className={styles.tags_items} href={`/catalog/${game?.slug}`}>
                            {dataFilter}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={`${styles.main_info_chips} ${styles.chips}`}>
                <div className={styles.chips_header}>
                  <span>Регион:</span> {catalog.external_data.region}
                </div>
                <div className={styles.chips_list}>
                  {Array.from(new Set(foundGames
                  ))
                    .filter((data) => data.external_data.platform === catalog.external_data.platform)
                    .filter((data) => data.external_data.product_details.value === catalog.external_data.product_details.value)
                    .map((dataFilter) => {
                      const isActive = dataFilter.external_data.region === catalog.external_data.region;

                      return (
                        <div className={`${styles.tags_item} ${isActive ? styles.chips_list_active : ''}`}
                             key={dataFilter.slug}>
                          <Link className={styles.tags_items} href={`/catalog/${dataFilter.slug}`}>
                            {dataFilter.external_data.region}
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className={styles.form_product_payment}>
              <div className={styles.product_payment}>
                <div className={styles.description}>
                  <h2 className={styles.payment_form_title}>{catalog.name}</h2>
                  <div className={styles.form_price}>
                    <div className={styles.price_header}>
                      <p className={styles.price_title}>Удачкоины:</p>
                      <div className={styles.price_body}>
                        <div className={stylesCoin.product_price} style={{marginTop: '5px', display: 'block'}}>
                          <div style={{display: 'flex'}}>
                            {catalog.old_price != null ?
                              <>
                                <div
                                  className={stylesCoin.prices_discount}>{-useCalculateDiscount(catalog.old_price, catalog.price)}%
                                </div>
                              </>
                              : <></>
                            }
                            <div className={`${stylesCoin.prices_price} ${styles.price_coin}`}>
                              <span style={{marginLeft: '3px'}}>
                                <svg width="20" height="20" viewBox="0 0 201 201" fill="none" style={{marginRight: '5px'}}>
                                  <g clip-path="url(#clip0_3259_1300)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M100.5 201C156.005 201 201 156.005 201 100.5C201 44.9954 156.005 0 100.5 0C44.9954 0 0 44.9954 0 100.5C0 156.005 44.9954 201 100.5 201ZM59.5086 150.75H84.3823V107.774L122.246 150.75H152.509L108.151 98.5151L145.599 54.0188H115.751L84.3823 90.9148V54.0188H59.5086V150.75Z" fill="#09ba82">
                                    </path>
                                  </g>
                                </svg>
                              </span>
                              {catalog.price.toLocaleString('ru-RU')}
                            </div>
                          </div>
                          <div className={stylesCoin.prices_currency_price} style={{marginTop: '5px'}}>
                             <span>
                               С картой {catalog.price.toLocaleString('ru-RU')} /&nbsp;
                             </span>
                            {catalog.old_price === null ?
                              <div>{parseInt(catalog.price_in_gold).toLocaleString('ru-RU')} ₽</div> :
                              <div
                                style={{textDecorationLine: 'line-through', display: 'flex', opacity: '.5'}}>
                                {catalog.old_price.toLocaleString('ru-RU')} ₽
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.payment_form_button_container}>
                    <button type="button" className={styles.payment_form_button} onClick={handleAddToCart}>
                      <span className={styles.v_btn_overlay}></span>
                      <span className={styles.button_content}>
                        <svg width="15" height="32" viewBox="0 0 15 32" fill="none">
                          <path
                            d="M3 19.8889C3.39782 19.8889 3.77936 20.0528 4.06066 20.3445C4.34196 20.6362 4.5 21.0319 4.5 21.4444C4.5 21.857 4.34196 22.2527 4.06066 22.5444C3.77936 22.8361 3.39782 23 3 23C2.60218 23 2.22064 22.8361 1.93934 22.5444C1.65804 22.2527 1.5 21.857 1.5 21.4444C1.5 21.0319 1.65804 20.6362 1.93934 20.3445C2.22064 20.0528 2.60218 19.8889 3 19.8889ZM3 19.8889H11.25M3 19.8889V9H1.5M11.25 19.8889C11.6478 19.8889 12.0294 20.0528 12.3107 20.3445C12.592 20.6362 12.75 21.0319 12.75 21.4444C12.75 21.857 12.592 22.2527 12.3107 22.5444C12.0294 22.8361 11.6478 23 11.25 23C10.8522 23 10.4706 22.8361 10.1893 22.5444C9.90804 22.2527 9.75 21.857 9.75 21.4444C9.75 21.0319 9.90804 20.6362 10.1893 20.3445C10.4706 20.0528 10.8522 19.8889 11.25 19.8889ZM3 10.5556L13.5 11.3333L12.75 16.7778H3"
                            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          </path>
                        </svg>
                        <span style={{marginLeft: '5px'}}>Добавить в корзину</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDescription data={catalog}/>
        </div>
      </MainContent>
      <div className={styles.payment_hint}>
        <div className={styles.payment_hint_bottom} style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <div className={stylesCoin.product_price} style={{marginTop: '0px', display: 'block'}}>
              <div style={{display: 'flex'}}>
                {catalog.old_price != null ?
                  <>
                    <div
                      className={stylesCoin.prices_discount}>{-useCalculateDiscount(catalog.old_price, catalog.price)}%
                    </div>
                  </>
                  :
                  <>
                  </>
                }
                <div className={`${stylesCoin.prices_price} ${styles.price_coin}`}>
                  <span style={{marginLeft: '3px'}}>
                    <svg width="20" height="20" viewBox="0 0 201 201" fill="none" style={{marginRight: '5px'}}>
                      <g data-v-08588fab="" clip-path="url(#clip0_3259_1300)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M100.5 201C156.005 201 201 156.005 201 100.5C201 44.9954 156.005 0 100.5 0C44.9954 0 0 44.9954 0 100.5C0 156.005 44.9954 201 100.5 201ZM59.5086 150.75H84.3823V107.774L122.246 150.75H152.509L108.151 98.5151L145.599 54.0188H115.751L84.3823 90.9148V54.0188H59.5086V150.75Z" fill="#09ba82"></path>
                      </g>
                    </svg>
                  </span>
                  {catalog.price.toLocaleString('ru-RU')}
                </div>
              </div>
              <div className={stylesCoin.prices_currency_price} style={{marginTop: '5px'}}>
                <span>
                  С кратой {catalog.price.toLocaleString('ru-RU')} /&nbsp;
                </span>
                {catalog.old_price === null ?
                  <div>{parseInt(catalog.price_in_gold).toLocaleString('ru-RU')} ₽</div> :
                  <div
                    style={{textDecorationLine: 'line-through', display: 'flex', opacity: '.5'}}>
                    {catalog.old_price.toLocaleString('ru-RU')} ₽
                  </div>
                }
              </div>
            </div>
          </div>
          <div>
            <div className={styles.payment_form_button_container} style={{marginTop: '0px'}}>
              <button type="button" className={styles.payment_form_button} onClick={handleAddToCart}>
                <span className={styles.v_btn_overlay}></span>
                <span className={styles.button_content} style={{marginRight: '10px', marginLeft: '10px'}}>
                  <svg width="15" height="32" viewBox="0 0 15 32" fill="none" data-v-6c152870="">
                    <path
                      d="M3 19.8889C3.39782 19.8889 3.77936 20.0528 4.06066 20.3445C4.34196 20.6362 4.5 21.0319 4.5 21.4444C4.5 21.857 4.34196 22.2527 4.06066 22.5444C3.77936 22.8361 3.39782 23 3 23C2.60218 23 2.22064 22.8361 1.93934 22.5444C1.65804 22.2527 1.5 21.857 1.5 21.4444C1.5 21.0319 1.65804 20.6362 1.93934 20.3445C2.22064 20.0528 2.60218 19.8889 3 19.8889ZM3 19.8889H11.25M3 19.8889V9H1.5M11.25 19.8889C11.6478 19.8889 12.0294 20.0528 12.3107 20.3445C12.592 20.6362 12.75 21.0319 12.75 21.4444C12.75 21.857 12.592 22.2527 12.3107 22.5444C12.0294 22.8361 11.6478 23 11.25 23C10.8522 23 10.4706 22.8361 10.1893 22.5444C9.90804 22.2527 9.75 21.857 9.75 21.4444C9.75 21.0319 9.90804 20.6362 10.1893 20.3445C10.4706 20.0528 10.8522 19.8889 11.25 19.8889ZM3 10.5556L13.5 11.3333L12.75 16.7778H3"
                      stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                  </svg>
                  <span style={{marginLeft: '5px'}}>В корзину</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <TapBar catalog={"1"} main={".5"} cart={".5"}/>
    </Page>
  )
}

export default PageCatalog

