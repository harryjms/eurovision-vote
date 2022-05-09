import AuthProvider from "../providers/AuthProvider";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
};

export default App;
