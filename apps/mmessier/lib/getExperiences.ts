export const getExperiences = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('encountered error while retrieved experiences');
  }
  return response.json();
};
