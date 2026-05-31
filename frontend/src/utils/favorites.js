export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const addFavorite = (property) => {
  let favs = getFavorites();

  const exists = favs.find((p) => p.id === property.id);

  if (!exists) {
    favs.push(property);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
};

export const removeFavorite = (id) => {
  let favs = getFavorites();

  favs = favs.filter((p) => p.id !== id);

  localStorage.setItem("favorites", JSON.stringify(favs));
};