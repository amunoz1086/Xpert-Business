

import { useEffect, useRef, useState } from 'react';

export const useInactividad = () => {
  const [inactivo, setInactivo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [expiroSession, setExpiroSession] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');

  const timeoutRef = useRef(null);
  const modalTimeoutRef = useRef(null);
  const expirationTimeoutRef = useRef(null);

  const resetInactivityTimer = () => {

    if ((inactivo == false) && showModal == false) {
      setInactivo(false);
      setShowModal(false);
      setExpiroSession(false);
      clearTimeout(modalTimeoutRef.current);
      clearTimeout(expirationTimeoutRef.current);
    }




    if (inactivo || showModal) {
      setInactivo(false);
      setShowModal(false);
      setExpiroSession(false);
      clearTimeout(modalTimeoutRef.current);
      clearTimeout(expirationTimeoutRef.current);
    }

    clearTimeout(timeoutRef.current);
    clearTimeout(expirationTimeoutRef.current);


    const inactivityTime = parseInt(process.env.NEXT_PUBLIC_INACTIVITY_TIME || "2", 10) * 60000; 
    const modalDisplayTime = parseInt(process.env.NEXT_PUBLIC_MODAL_DISPLAY_TIME || "1", 10) * 60000; 
    const sessionExpirationTime = parseInt(process.env.NEXT_PUBLIC_SESSION_EXPIRATION_TIME || "1", 10) * 60000;


    timeoutRef.current = setTimeout(() => {
      setInactivo(true);

      // Después de 2 minutos de inactividad, muestra el modal
      modalTimeoutRef.current = setTimeout(() => {
        setMessageAlert('Tu sesión se cerrará en 1 minuto por inactividad. Realiza alguna acción para mantenerla activa.')
        setShowModal(true);
        // Después de 1 minuto del modal mostrado, expira la sesión
        expirationTimeoutRef.current = setTimeout(() => {
          setShowModal(false);
          setExpiroSession(true);
        }, sessionExpirationTime); // 1 minuto después de mostrar el modal
      }, modalDisplayTime); // 2 minutos después de detectar inactividad

    }, inactivityTime); // Detectar inactividad después de 1 minuto
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click'];

    events.forEach(event => window.addEventListener(event, resetInactivityTimer));

    resetInactivityTimer();

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(modalTimeoutRef.current);
      clearTimeout(expirationTimeoutRef.current);
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
    };
  }, []);

  return { inactivo, showModal, expiroSession, messageAlert };
};

