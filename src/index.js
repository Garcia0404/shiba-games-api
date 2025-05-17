import express from 'express';
import { router } from './routes/routes.js';
import cors from "cors";
import { validateGameExists, validateVote } from './middlewares/validateVote.js';
import { db } from './database/connection.js';
import rateLimit from "express-rate-limit";
// Limitar solicitudes
const voteLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 día
  max: 2,
  message: "Demasiadas solicitudes, intenta más tarde.",
});
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware para detectar IP
app.set('trust proxy', true);
app.use(cors({
  origin: ['http://localhost:4173', 'http://localhost:5173', 'https://shiba-games.vercel.app'], // Reemplaza con tus dominios
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ "message": "Hello world" })
});
// votos
app.post('/api/vote', voteLimiter, validateGameExists, validateVote, async (req, res) => {
  const ip = req.ip;
  const uuid = req.query.by
  try {
    await db.execute({
      sql: 'INSERT INTO votes(ip,game_uuid) VALUES(?,?)',
      args: [ip, uuid],
    });
    res.status(200).send('¡Gracias por tu voto!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el voto');
  }
});

app.use('/api/games', router)

// Ruta para 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});