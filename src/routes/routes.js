import express from "express";
import { getGames } from "../utils/games.js";

export const router = express.Router();
router.get("/", async(req, res) => {
  const {games} = await getGames()
  res.json(games)
});
// router.get("/", (req, res) => {
//   // const { search, popular, recents, ascending, descending, ...genres } = req.query;


//   // // Lista de géneros válidos
//   // const validGenres = ["action", "adventure", "rpg", "fighting", "fps", "sandbox", "indie", "simulation"];

//   // // Filtrar por géneros dinámicamente
//   // let gamesFiltered = [...games];
//   // validGenres.forEach((genre) => {
//   //   if (genres[genre] === "true") {
//   //     gamesFiltered = gamesFiltered.filter((game) =>
//   //       game.category.some((category) => category.toLowerCase() === genre)
//   //     );
//   //   }
//   // });

//   // // Ordenar por popularidad, recientes, precio, etc.
//   // if (popular === "true") {
//   //   //Agregar lógica de los más populares
//   // } else if (recents === "true") {
//   //   gamesFiltered.reverse();
//   // } else if (ascending === "true") {
//   //   gamesFiltered.sort((a, b) => a.price - b.price);
//   // } else if (descending === "true") {
//   //   gamesFiltered.sort((a, b) => b.price - a.price);
//   // }
//   // // Filtrar por texto de búsqueda dentro de los resultados filtrados
//   // if (search) {
//   //   gamesFiltered = gamesFiltered.filter((game) =>
//   //     game.title.toLowerCase().includes(search.toLowerCase()) ||
//   //     game.description?.toLowerCase().includes(search.toLowerCase())
//   //   );
//   // }
//   // // Responder con los juegos filtrados
//   // res.json(gamesFiltered);
// });

router.get("/:uuid", (req, res) => {
  const { uuid } = req.params;
  res.json({ uuid });
});