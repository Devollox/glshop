import {ThemeProvider} from 'next-themes'
import Head from "@/components/head";
import '../styles/globals.css';
import '../styles/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Props {
  Component: typeof Head
  pageProps: {}
}

const MyApp: React.FC<Props> = ({Component, pageProps}) => {
  return (
    <>
      <Head />
      <ThemeProvider defaultTheme={"light"}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
export default MyApp