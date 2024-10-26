import styles from './tapbar.module.css'
import Basket from "@/components/icons/basket";
import {CartItem, cartService} from "@/service/cartservice";
import {useEffect, useState} from "react";

interface Props {
  main?: string,
  catalog?: string
  cart?: string,
}

const TapBar: React.FC<Props> = ({main, catalog, cart}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const subscription = cartService.cartItems$.subscribe((items) => {
      setCartItems(items);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className={styles.g_tapbar}>
        <a href="/" style={{marginRight: '2rem', opacity: `${main}`}} className={styles.g_tapbar_item} aria-current="page">
          <div className={styles.g_tapbar_icon}>
            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                    d="m11.787 12.334 2.985 3.141a1.687 1.687 0 0 0 2.879-1.483l-1.174-6.037m-9.09-.022V9.4m-.733-.733h1.467m3.666 0h1.467M12.888 5a3.667 3.667 0 0 1 0 7.334H8.854l-2.944 3.1a1.687 1.687 0 0 1-2.877-1.493L4.23 7.947A3.667 3.667 0 0 1 7.827 5h5.06Z"
                    stroke="#fff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
              </path>
            </svg>
          </div>
          <div className={styles.g_tapbar_title}>Главная</div>
        </a>
        <a href="/catalog/"  style={{marginRight: '2rem', opacity: `${catalog}`}} className={styles.g_tapbar_item} aria-current="page">
          <div className={styles.g_tapbar_icon}>
            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path data-v-fca5a966="" d="m16 16-3-3M5 9a4 4 0 1 0 9 0 4 4 0 0 0-9 0Z" stroke="#fff" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
          <div className={styles.g_tapbar_title}>Католог</div>
        </a>
        <a href="/cart/" style={{opacity: `${cart}`}} className={styles.g_tapbar_item} aria-current="page">
          <div className={styles.g_tapbar_icon}>
            <svg width="14" height="24"
                 viewBox="0 0 14 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <Basket/>
            </svg>
            {cartItems.length !== 0 && (
              <div className={styles.header_control_badge}>{cartItems.length}</div>
            )}
          </div>
          <div className={styles.g_tapbar_title}>Корзина</div>
        </a>
      </div>
    </>
  )
}

export default TapBar