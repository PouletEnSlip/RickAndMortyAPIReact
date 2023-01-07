import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

function Personnages() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setCharacters(data.results);
    }
    fetchData();

    const favoriteCharactersString = getCookie('favoriteCharacters');
    if (favoriteCharactersString) {
      setFavoriteCharacters(JSON.parse(favoriteCharactersString));
    }
  }, [page]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleToggleFavorite(character) {
    if (favoriteCharacters.includes(character)) {
      setFavoriteCharacters(favoriteCharacters.filter(c => c !== character));
    } else {
      setFavoriteCharacters([...favoriteCharacters, character]);
    }
    setCookie('favoris', JSON.stringify(favoriteCharacters), 365);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
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
              <button onClick={() => handleToggleFavorite(character)}>
                {favoriteCharacters.includes(character) ? (
                  <FaHeart color="#e74c3c" />
                ) : (
                  <FaHeart />
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main> 
  );
}

export default Personnages;
