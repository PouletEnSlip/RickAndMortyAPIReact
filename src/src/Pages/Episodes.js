import React, { useState, useEffect } from 'react';

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
      const data = await response.json();
      setEpisodes(data.results);
    }
    fetchData();
  }, [page]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }


  return (
    <main className="container mx-auto">
      <section>
        <h1 className="text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold">
          Episodes
        </h1>
        <div className="block m-auto h-8 mb-24 text-white">
        <button className="block float-left bg-blue-600 p-4 m-4 ml-36 max-[600px]:mx-4 transition ease-in-out hover:bg-blue-400" onClick={handlePreviousPage}>Page précédente</button>
          <button className="block float-right bg-blue-600 p-4 m-4 mr-36 max-[600px]:mx-4 transition ease-in-out hover:bg-blue-400" onClick={handleNextPage}>Page suivante</button>
        </div>
        <div className="grid grid-cols-3 max-[600px]:grid-cols-1 m-auto mb-16 light:text-black dark:text-white">
          {episodes.map(episodes => (
            <div key={episodes.id} className="grid gap-4 m-10">
              <div className="flex flex-col rounded-md border-2">
                <div className="p-5">
                  <h2 className="font-bold text-2xl inline">{episodes.id}:{episodes.name}</h2>
                  <p>{episodes.air_date}</p>
                  <p>{episodes.episode}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main> 
  );
}

export default Episodes;