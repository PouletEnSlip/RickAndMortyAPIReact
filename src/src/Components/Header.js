import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageId = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APPID;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageId,
  messagingSenderId: messagingSenderId,
  appId: appId
};

firebase.initializeApp(firebaseConfig);

function Header() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleClass = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="container mx-auto md:flex justify-between py-2 max-width">
      <div className="flex justify-between items-center py-2 md:py-10">
        <div onClick={toggleClass} className="cursor-pointer">
          <svg
            className="stroke-dark-heading dark:stroke-white md:hidden"
            width="25"
            height="20"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.4375 1.3125H14.5625M1.4375 11.3125H14.5625H1.4375ZM1.4375 6.3125H14.5625H1.4375Z"
              strokeWidth="1.875"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <nav className={` ${!isOpen ? "hidden" : null} text-center md:flex justify-between`}>
        <ul className="dark:text-light-content font-medium md:flex text-left md:space-x-5 md:mr-10">
          <li className="py-1 md:pb-0">
            <NavLink to="./" onClick={toggleClass}>
              Accueil
            </NavLink>
          </li>
          <li className="py-1 md:pb-0">
            <NavLink to="/connexion/" onClick={toggleClass}>
              {!user ? (<p>Connexion</p>) : (<p>Déconnexion</p>) }
            </NavLink>
          </li>
          {!user ? (
          <li className="py-1 md:pb-0">
            <NavLink to="/inscription/" onClick={toggleClass}>
              Inscription
            </NavLink>
          </li>
          ) : null}
          {user ? (
          <li className="py-1 md:pb-0">
            <NavLink to="/favoris/" onClick={toggleClass}>
              Favoris
            </NavLink>
          </li>
          ) : null}
          <li className="py-1 md:pb-0">
            <NavLink to="/episodes/" onClick={toggleClass}>
              Épisodes
            </NavLink>
          </li>
          <li className="py-1 md:pb-0">
            <NavLink to="/personnages/" onClick={toggleClass}>
              Personnages
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;