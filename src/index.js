import express from 'express';
import { router } from './routes/routes.js';
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();
const allowedOrigins = ["http://localhost:5173", "https://shiba-games.vercel.app/"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
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