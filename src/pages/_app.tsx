import AppBar from "../component/AppBar";
import AuthProvider from "../providers/AuthProvider";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <AppBar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
};

export default App;
