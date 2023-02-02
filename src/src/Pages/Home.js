import React, { useState, useEffect } from "react";

function Home() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      const randomCharacters = getRandomCharacters(data.results, 5);
      setCharacters(randomCharacters);
    }
    fetchData();
  }, []);

  function getRandomCharacters(characters, count) {
    const shuffled = characters.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  return (
    <main className="container mx-auto max-width section md:flex justify-between items-center">
      <div>
        <h1
          className="text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold"
        >
          Bienvenue sur,<br></br>
          <span className="text-blue-700">Rick and Morty</span>
        </h1>
      </div>
      <div className="mt-5 md:mt-0 block light:text-black dark:text-white">
        {characters.map((character) => (
          <div className="inline-block m-2" key={character.id}>
            <a href="/personnages" aria-label="lien">
              <div className="divImage">
                <img width="100px"src={character.image} alt={character.name} />
              </div>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;