import express from 'express';
import { router } from './routes/routes.js';
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors({
  origin: ['http://localhost:4173', 'http://localhost:5173', 'https://shiba-games.vercel.app/'], // Reemplaza con tus dominios
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ "message": "Hello world" })
});
app.use('/api/games', router)

// Ruta para 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});