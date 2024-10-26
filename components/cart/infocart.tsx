import styles from "@/components/cart/cart.module.css";
import React from "react";

interface Props {
  title: string;
  description: string | undefined;
}

const InfoCart: React.FC<Props> = ({title, description}) => {
  return (
    <>
      <div className={styles.product_card_main_header_row}>
        <span>{title}: </span>
        <span>{description}</span>
      </div>
    </>
  )
}
export default InfoCart