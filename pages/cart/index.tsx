import React, { useEffect, useState } from "react";
import TapBar from "@/components/tapbar";
import Page from "@/components/page";
import MainContent from "@/components/maincontent";
import {CartItem, cartService} from "@/service/cartservice";
import TitleCatalog from "@/components/catalog/titlecatolog";
import styles from '@/components/cart/cart.module.css'
import Trash from "@/components/icons/trash";
import InfoCart from "@/components/cart/infocart";
import stylesCoin from "@/components/swipercart/swipercart.module.css";
import stylesButton from '../../components/catalog/catalog.module.css'
import calculateDiscount from "@/hook/calculateDiscount";
import Link from "next/link";
import SwiperCart from "@/components/swipercart";
import {Game} from "@/pages/catalog";
import { data as data_top } from "../../public/games/all_shop.json";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const subscription = cartService.cartItems$.subscribe((items) => {
      setCartItems(items);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleRemove = (itemToRemove: CartItem) => {
    cartService.removeFromCart(itemToRemove);
  };

  const handleClearCart = () => {
    cartService.clearCart();
  };

  const totalPrice = cartItems.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);

  const getItemLabel = (count: number) => {
    if (count === 1) {
      return 'товар';
    } else if (count > 1 && count < 5) {
      return 'товара';
    } else {
      return 'товаров';
    }
  };

  const filteredGames: Game[] = data_top.filter((game: Game) => {
    return game.tags.some((tag: { ru_name: string }) => {
      const year = parseInt(tag.ru_name);
      return !isNaN(year) && year >= 2000 && year <= 2024;
    });
  });

  return (
    <>
      <Page title="Корзина">
        <MainContent height="100%" margin="100px 0 0 0">
          <TitleCatalog title={"Корзина"}/>
          <div className={styles.cart_page_header}>
            <p className={styles.cart_page_counter}>
              {cartItems.length} {getItemLabel(cartItems.length)}
            </p>
            {cartItems.length != 0 && (
              <button className={styles.cart_page_clear} onClick={handleClearCart}>
                Очистить корзину
                <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Trash/>
                </svg>
              </span>
              </button>
            )}
          </div>
          <div className={styles.wrapper_page_list} style={{display: 'flex'}}>
            <div style={{width: '100%', marginRight: '50px'}}>
              {cartItems.length === 0 ? (
                <>
                  <div className={styles.cart_page_empty}>
                    <p className={styles.cart_page_empty_smile}>:’(</p>
                    <p className={styles.cart_page_empty_text}>
                      В корзине пока пусто
                    </p>
                    <p className={styles.cart_page_empty_text}>
                      Воспользуйся поиском, чтобы&nbsp;найти нужное. &nbsp;
                      <Link style={{textDecoration: 'none'}} href="/catalog" className={styles.cart_page_empty_link}>
                        В каталог →
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                cartItems.map((item) => (
                  <div key={item.slug}>
                    <div className={styles.cart_page_list}>
                      <div className={styles.cart_page_item}>
                        <div className={styles.product_card}>
                          <div className={styles.product_card_main}>
                            <div style={{display: 'flex'}}>
                              <img src={`${item.picture_url}`}
                                   className={styles.product_card_main_cover}
                              />
                              <div className={styles.product_card_main_header}>
                                <div>
                                  <p className={styles.product_card_main_header_title}>
                                    <Link href={`/catalog/${item.slug}`} style={{textDecoration: 'none', color: 'white'}}>
                                      {item.h1_title}
                                    </Link>
                                  </p>
                                </div>
                                <InfoCart title={'Платформа'} description={item.platform}/>
                                <InfoCart title={'Издание'} description={item.value}/>
                                <div className={styles.product_action}>
                                  <button className={styles.delete_button} onClick={() => handleRemove(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                         viewBox="0 0 24 24" fill="none">
                                      <path data-v-40788c3d=""
                                            d="M6 21L5.00221 21.0665C5.03723 21.5918 5.47354 22 6 22V21ZM18 21V22C18.5265 22 18.9628 21.5918 18.9978 21.0665L18 21ZM3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7V5ZM21 7C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5V7ZM11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11H11ZM9 16C9 16.5523 9.44772 17 10 17C10.5523 17 11 16.5523 11 16H9ZM15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11H15ZM13 16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16H13ZM14.9056 6.24926C15.0432 6.78411 15.5884 7.1061 16.1233 6.96844C16.6581 6.83078 16.9801 6.28559 16.8424 5.75074L14.9056 6.24926ZM4.00221 6.06652L5.00221 21.0665L6.99779 20.9335L5.99779 5.93348L4.00221 6.06652ZM6 22H18V20H6V22ZM18.9978 21.0665L19.9978 6.06652L18.0022 5.93348L17.0022 20.9335L18.9978 21.0665ZM19 5H5V7H19V5ZM3 7H5V5H3V7ZM19 7H21V5H19V7ZM9 11V16H11V11H9ZM13 11V16H15V11H13ZM12 4C13.3965 4 14.5725 4.95512 14.9056 6.24926L16.8424 5.75074C16.2874 3.59442 14.3312 2 12 2V4ZM9.09447 6.24926C9.42756 4.95512 10.6035 4 12 4V2C9.66885 2 7.7126 3.59442 7.1576 5.75074L9.09447 6.24926Z"
                                            fill="white"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className={stylesCoin.product_price} style={{marginTop: '0', display: 'block'}}>
                              <div style={{display: 'flex'}}>
                                {item.old_price != null ?
                                  <>
                                    <div
                                      className={stylesCoin.prices_discount}>{-calculateDiscount(item.old_price, item.price)}%
                                    </div>
                                  </>
                                  : <></>
                                }
                                <div className={`${stylesCoin.prices_price} ${styles.price_coin}`}>
                              <span style={{marginLeft: '3px'}}>
                                <svg width="20" height="20" viewBox="0 0 201 201" fill="none"
                                     style={{marginRight: '5px'}}>
                                  <g clip-path="url(#clip0_3259_1300)">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M100.5 201C156.005 201 201 156.005 201 100.5C201 44.9954 156.005 0 100.5 0C44.9954 0 0 44.9954 0 100.5C0 156.005 44.9954 201 100.5 201ZM59.5086 150.75H84.3823V107.774L122.246 150.75H152.509L108.151 98.5151L145.599 54.0188H115.751L84.3823 90.9148V54.0188H59.5086V150.75Z"
                                          fill="#09ba82">
                                    </path>
                                  </g>
                                </svg>
                              </span>
                                  {item.price.toLocaleString('ru-RU')}
                                </div>
                              </div>
                              <div className={stylesCoin.prices_currency_price} style={{marginTop: '5px'}}>
                              <span>
                               С картой {item.price.toLocaleString('ru-RU')} /&nbsp; {item.old_price === null ?
                                <div>{parseInt(item.price_in_gold).toLocaleString('ru-RU')} ₽</div> :
                                <div
                                  style={{textDecorationLine: 'line-through', display: 'flex', opacity: '.5'}}>
                                  {item.old_price.toLocaleString('ru-RU')} ₽
                                </div>}
                              </span>
                              </div>
                            </div>
                            <div className={styles.product_card_payment}>
                              <div className={stylesButton.payment_form_button_container} style={{marginTop: '0px'}}>
                                <button type="button" className={stylesButton.payment_form_button}>
                                  <span className={stylesButton.v_btn_overlay}></span>
                                  <span className={stylesButton.button_content}
                                        style={{marginRight: '10px', marginLeft: '10px'}}>
                                    <svg width="15" height="32" viewBox="0 0 15 32" fill="none" data-v-6c152870="">
                                      <path
                                        d="M3 19.8889C3.39782 19.8889 3.77936 20.0528 4.06066 20.3445C4.34196 20.6362 4.5 21.0319 4.5 21.4444C4.5 21.857 4.34196 22.2527 4.06066 22.5444C3.77936 22.8361 3.39782 23 3 23C2.60218 23 2.22064 22.8361 1.93934 22.5444C1.65804 22.2527 1.5 21.857 1.5 21.4444C1.5 21.0319 1.65804 20.6362 1.93934 20.3445C2.22064 20.0528 2.60218 19.8889 3 19.8889ZM3 19.8889H11.25M3 19.8889V9H1.5M11.25 19.8889C11.6478 19.8889 12.0294 20.0528 12.3107 20.3445C12.592 20.6362 12.75 21.0319 12.75 21.4444C12.75 21.857 12.592 22.2527 12.3107 22.5444C12.0294 22.8361 11.6478 23 11.25 23C10.8522 23 10.4706 22.8361 10.1893 22.5444C9.90804 22.2527 9.75 21.857 9.75 21.4444C9.75 21.0319 9.90804 20.6362 10.1893 20.3445C10.4706 20.0528 10.8522 19.8889 11.25 19.8889ZM3 10.5556L13.5 11.3333L12.75 16.7778H3"
                                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      </path>
                                    </svg>
                                    <span
                                      style={{marginLeft: '5px'}}>Купить за {item.price.toLocaleString('ru-RU')}
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length != 0 && (
              <div className={styles.cart_page_sidebar}>
                <div className={styles.payment_details}>
                  <div className={styles.payment_details_form}>
                    <form className={styles.v_form}>
                      <div className={styles.payment_details_header}>
                        <p className={styles.payment_details_title}>Итого</p>
                      </div>
                      <div style={{marginTop: '10px'}}>
                      <span style={{fontSize: '24px'}}>
                        {totalPrice.toLocaleString('ru-RU')}
                      </span>
                        <span style={{marginLeft: '5px'}}>
                        <svg width="20" height="20" viewBox="0 0 201 201" fill="none"
                             style={{marginRight: '5px'}}>
                          <g clip-path="url(#clip0_3259_1300)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M100.5 201C156.005 201 201 156.005 201 100.5C201 44.9954 156.005 0 100.5 0C44.9954 0 0 44.9954 0 100.5C0 156.005 44.9954 201 100.5 201ZM59.5086 150.75H84.3823V107.774L122.246 150.75H152.509L108.151 98.5151L145.599 54.0188H115.751L84.3823 90.9148V54.0188H59.5086V150.75Z"
                                  fill="#09ba82">
                            </path>
                          </g>
                        </svg>
                      </span>
                        <span style={{opacity: '.5'}}>
                        / картой {totalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      </div>
                    </form>
                    <div className={styles.product_card_payment} style={{marginTop: '20px'}}>
                      <div className={stylesButton.payment_form_button_container} style={{marginTop: '0px'}}>
                        <button type="button" className={stylesButton.payment_form_button}>
                          <span className={stylesButton.v_btn_overlay}>
                          </span>
                          <span className={stylesButton.button_content} style={{marginRight: '10px', marginLeft: '10px'}}>
                            Купить
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <SwiperCart title="Топ продаж" data={filteredGames} />
        </MainContent>
        <TapBar catalog=".5" cart="1" main=".5"/>
      </Page>
    </>
  );
};

export default Cart;
