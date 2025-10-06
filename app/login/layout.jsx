//import { Suspense } from "react";
import ImagenLogin from "../components/login/ImagenLogin";
import PropTypes from 'prop-types';
//import { EventosSession } from "../components/EventosSession";

export default function Layout({ children }) {
  return (
    <div className="bg-coomeva_color-grisFondo flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-[50%]">
        <ImagenLogin />
      </div>
      <div className="flex-grow py-2 md:overflow-y-auto md:pt-12 px-12  mx-4 my-1">
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired
}