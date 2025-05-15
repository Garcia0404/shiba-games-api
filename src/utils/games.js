import { readFile } from "fs/promises";
import { join } from "path";

export const getGames = async () => {
  const filePath = join(process.cwd(), "data", "games.json"); // Ruta absoluta al archivo
  const data = await readFile(filePath, "utf-8"); // Leer el archivo como texto
  return { games: JSON.parse(data) }; // Parsear el JSON y devolver los datos
};