import styles from "./navbar.module.css"
import Basket from "@/components/icons/basket";
import Search from "@/components/icons/search";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.search_button}>
            <span>
              <svg width="16" height="16"
                   viewBox="0 0 16 16" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <Search/>
                </g>
              </svg>
            </span>
            <input className={styles.header_search_input} type="text" placeholder="Найти что-то конкретное.."/>
          </div>
          <Link href="/cart">
            <div className={styles.control_button} style={{marginLeft: '12px'}}>
              <div className={styles.header_control_button}>
                <span>
                  <svg width="14" height="24"
                       viewBox="0 0 14 24" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <Basket/>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar