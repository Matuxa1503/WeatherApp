import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-mainColor min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}
