import React, { useState, useEffect } from 'react';
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

const FavoritesList = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        getFavorites();
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  async function getFavorites() {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const db = firebase.firestore();
        const query = await db.collection('favoris').where('user_id', '==', user.email).get();
        if (query.docs.length >= 0) {
          setFavorites(query.docs.map(doc => doc.data()));
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  async function removeFromFavorites(characterId) {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const db = firebase.firestore();
        const query = await db
          .collection('favoris')
          .where('user_id', '==', user.email)
          .where('character_id', '==', characterId)
          .get();
        query.docs.forEach(async doc => {
          await doc.ref.delete();
        });
        getFavorites();
      }
    } catch (error) {
      alert(error);
    }
  }  


  return (
    <main className="container mx-auto">
      {user ? (
      <section>
        <h1 className="text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold">
          Favoris
        </h1>
        {favorites.length > 0 ? (
        <div className="inline-block m-4">
        {favorites.map(favorite => (
          <div className="block m-auto mb-16 light:text-black dark:text-white">
            <div key={favorite.character_id}>
              <img src={"https://rickandmortyapi.com/api/character/avatar/" + favorite.character_id + ".jpeg"} alt="personnage" />
              <button className="p-4 block bg-blue-700 w-64 mt-4 m-auto" onClick={() => removeFromFavorites(favorite.character_id)}>
                Retirer des favoris 🖤
              </button>
            </div>
          </div>
        ))}
        </div>
        ) : (
          <h2 className="text-white m-4">Pas de favoris</h2>
        )}
      </section>
      ) : null }
    </main>
  );
}


export default FavoritesList;