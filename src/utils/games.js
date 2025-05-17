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
    sql: "SELECT * FROM games"
  });
  return { games: rows }
}