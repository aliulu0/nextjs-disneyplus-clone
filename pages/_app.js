import "../styles/globals.css";
import { AuthContextProvider } from "../context/UserContext";
export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />;
    </AuthContextProvider>
  );
}
