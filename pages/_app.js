// pages/_app.js o pages/_app.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';

import Modal from "react-modal";

Modal.setAppElement("#__next"); // Indica el elemento raíz de tu aplicación

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Actualiza el elemento raíz de la aplicación cuando cambia de página
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, [router.asPath]);

  return <Component {...pageProps} />;
}

export default MyApp;
