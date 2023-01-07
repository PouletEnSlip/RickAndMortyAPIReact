import React, { useState, useEffect } from 'react';

const FavoritesList = () => {
  const [favorites, setFavoris] = useState([]);

  useEffect(() => {
    const favoritesFromCookie = getCookie('favoris');
    if (favoritesFromCookie) {
      setFavoris(JSON.parse(favoritesFromCookie));
    }
  }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  return (
    <main className="container mx-auto">
      <section>
        <h1 className="text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold">
          Favoris
        </h1>
        <div className="block m-auto my-16 light:text-black dark:text-white">
          {favorites.map(favorite => (
            <div className="inline-block m-4" key={favorite.id}>
              <div className="divImage">
                <img className="m-auto" src={favorite.image} alt={favorite.name} />
              </div>
              <div>{favorite.name}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default FavoritesList;
