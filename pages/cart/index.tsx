import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";
import TapBar from "@/components/tapbar";

const Cart = () => {
  return (
    <>
      <Navbar />
      <Footer />
      <TapBar catalog={".5"} cart={"1"} main={".5"} />
    </>
  )
}

export default Cart