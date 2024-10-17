import Page from '../components/page'
import Navbar from "@/components/navbar";
import Slider from "@/components/slider";

const Main = () => {
  return (
    <Page
      title="Shop games"
      description="Main page shop."
    >
      <Navbar />
      <Slider />
    </Page>
  );
}

export default Main
