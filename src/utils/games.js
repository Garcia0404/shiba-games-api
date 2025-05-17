// import { readFile } from "fs/promises";
// import { join } from "path";
import { db } from "../database/connection.js"
// export const getGames = async () => {
//   const filePath = join(process.cwd(), "data", "games.json"); // Ruta absoluta al archivo
//   const data = await readFile(filePath, "utf-8"); // Leer el archivo como texto
//   return { games: JSON.parse(data) }; // Parsear el JSON y devolver los datos
// };
export const getGames = async () => {
  const { rows } = await db.execute({
    sql: `
      SELECT 
        g.uuid,
        g.title,
        g.provider,
        g.price,
        g.discount,
        g.description,
        g.image,
        g.trailer,
        g.popularity,
        GROUP_CONCAT(c.name) AS categories
      FROM games g
      LEFT JOIN game_categories gc ON g.uuid = gc.game_uuid
      LEFT JOIN categories c ON gc.category_id = c.id
      GROUP BY g.uuid
    `
  });

  return {
    games: rows.map(game => ({
      ...game,
      category: game.categories ? game.categories.split(',') : []
    }))
  };
}