import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

function Home() {
  const h11 = useRef();
  const h12 = useRef();
  const h13 = useRef();
  const myimageref = useRef();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://rickandmortyapi.com/api/character?page=2');
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
  
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(
      h11.current,
      {
        x: "-100%",
        delay: .2,
        opacity: 0,
        duration: .5,
        ease: "Power3.easeOut",
      },
      "<"
    )
      .from(
        h12.current,
        {
          x: "-100%",
          delay: .2,
          opacity: 0,
          duration: .6,
          ease: "Power3.easeOut",
        },
        "<"
      )
      .from(
        h13.current,
        {
          x: "-100%",
          delay: .2,
          opacity: 0,
          duration: .7,
          ease: "Power3.easeOut",
        },
        "<"
      )
      .from(
        myimageref.current,
        {
          x: "-200%",
          delay: .5,
          opacity: 0,
          duration: .8,
          ease: "Power3.easeOut",
        },
        "<"
      );
  }, []);

  return (
    <main className="container mx-auto max-width section md:flex justify-between items-center">
      <div>
        <h1
          ref={h11}
          className="text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold"
        >
          Bienvenue sur,<br></br>
        </h1>
        <h1
          ref={h12}
          className="text-2xl bg-clip-text bg-gradient text-transparent md:text-4xl xl:text-5xl xl:leading-tight font-bold"
        >
          Rick and Morty
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
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;