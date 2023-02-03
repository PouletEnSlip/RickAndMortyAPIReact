import React, { useState } from 'react';
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

const Inscription = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email) {
        setError('L\'email est obligatoire');
        setLoading(false);
        return;
      }
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!regexEmail.test(email)) {
        setError('L\'email n\'est pas valide');
        setLoading(false);
        return;
      }
      if (!password) {  
        setError('Le mot de passe est obligatoire');
        setLoading(false);
        return;
      }
      if (password.length < 8) {
        setError('Le mot de passe doit faire au moins 8 caractères');
        setLoading(false);
        return;
      }
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      localStorage.setItem('token', response.user.uid);
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto">
      <section>
        <h1 className="text-2xl m-4 text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold">
          Inscription
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col m-4 text-white">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-64 p-2 m-auto text-black text-center border-2 border-blue-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col m-4 text-white">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="w-64 p-2 m-auto text-black text-center border-2 border-blue-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" id="submit" className="bg-blue-700 text-white p-4 m-4 transition ease-in-out hover:bg-blue-400" disabled={loading}>
            {loading ? 'S\'inscrire...' : 'S\'inscrire'}
          </button>
          {error && <p className="text-white">{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default Inscription;