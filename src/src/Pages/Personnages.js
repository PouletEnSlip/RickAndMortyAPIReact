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

function Personnages() {
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setCharacters(data.results);
    }
    fetchData();

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        const db = firebase.firestore();
        db.collection('favoris')
          .where('user_id', '==', user.email)
          .get()
          .then(querySnapshot => {
            const favorites = [];
            querySnapshot.forEach(doc => {
              favorites.push(doc.data().character_id);
            });
            setFavorites(favorites);
          });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [page]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  async function addToFavorites(character) {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const db = firebase.firestore();
        const query = await db.collection('favoris').where('character_id', '==', character.id).where('user_id', '==', user.email).get();
        if (query.docs.length > 0) {
          return;
        }
        db.collection('favoris').add({
          character_id: character.id,
          user_id: user.email
        });
        setFavorites([...favorites, character.id]);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <main className="container mx-auto">
      <section>
        <h1 className="text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold">
          Personnages
        </h1>
        <div className="block m-auto h-8 mb-24 text-white">
          <button className="block float-left bg-blue-600 p-4 m-4 ml-36 max-[600px]:mx-4 transition ease-in-out hover:bg-blue-400" onClick={handlePreviousPage}>Page précédente</button>
          <button className="block float-right bg-blue-600 p-4 m-4 mr-36 max-[600px]:mx-4 transition ease-in-out hover:bg-blue-400" onClick={handleNextPage}>Page suivante</button>
        </div>
        <div className="block m-auto mb-16 light:text-black dark:text-white">
          {characters.map(character => (
            <div key={character.id} className="inline-block m-4">
              <div className="divImage">
                <img src={character.image} alt={character.name} />
              </div>
              <h2 className="font-bold text-2xl inline">{character.name}</h2>
              <p>Statut : {character.status}</p>
              <p>Sexe : {character.gender}</p>
              <p>Type : {character.type || 'Non spécifié'}</p>
              <p>Location : {character.location.name}</p>
              {user ? (
                <button className="p-4 block bg-blue-700 w-64 mt-4 m-auto disabled:opacity-25" 
                  onClick={() => addToFavorites(character)}
                  disabled={favorites.includes(character.id)}>
                  Mettre en favoris ❤️
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </main> 
  );
}

export default Personnages;