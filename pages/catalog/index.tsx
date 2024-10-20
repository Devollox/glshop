import Footer from "@/components/footer";
import React from "react";
import Navbar from "@/components/navbar";
import TapBar from "@/components/tapbar";


const Catalog = () => {
  return (
    <>
      <Navbar />
      <Footer />
      <TapBar catalog={"1"} main={".5"} cart={".5"}/>
    </>
  )
}

export default Catalog

