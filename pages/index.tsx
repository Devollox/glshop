import Page from '../components/page'
import Navbar from "@/components/navbar";
import Slider from "@/components/slider";
import Footer from "@/components/footer";

const Main = () => {
  return (
    <Page
      title="Shop games"
      description="Main page shop."
    >
      <Navbar />
      <Slider />
      <Footer />
    </Page>
  );
}

export default Main
