import { db } from "../database/connection.js"
import { getGames } from "../utils/games.js";
export const validateVote = async (req, res, next) => {
  const ip = req.ip;
  const uuid = req.query.by;

  try {
    const { rows } = await db.execute({
      sql: 'SELECT * FROM votes WHERE ip = ? AND game_uuid=?',
      args: [ip, uuid],
    });

    if (rows.length > 0) {
      return res.status(403).send('Ya votaste por este juego');
    }
    next(); // Continúa al controlador de la ruta
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al verificar el voto');
  }
};
export const validateGameExists = async (req, res, next) => {
  const uuid = req.query.by;
  const { games } = await getGames();
  const exists = games.some(game => game.uuid === uuid);
  if (!exists) {
    return res.status(404).send('Juego no encontrado');
  }
  next();
}