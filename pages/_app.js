import Header from '../components/Header';
import { Lato } from 'next/font/google';
import '../styles/global.css';

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function App({ Component, pageProps, router }) {
  return (
    <div className={`${lato.className} bg-mainColor min-h-screen p-4 flex justify-center items-center`}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
