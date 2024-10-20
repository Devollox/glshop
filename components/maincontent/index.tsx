import styles from './maincontent.module.css'
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainContent: React.FC<Props> = ({children}) => {
  return (
    <>
      <div className={styles.wrapper_container}>
        <div className={styles.wrapper_swiper}>
          {children}
        </div>
      </div>
    </>
  )
}

export default MainContent