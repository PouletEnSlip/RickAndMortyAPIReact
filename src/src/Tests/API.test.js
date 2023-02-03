import '@testing-library/jest-dom';

it("API returns data", async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data).toHaveProperty("results");
});