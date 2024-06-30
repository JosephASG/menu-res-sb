import express from "express";
import path from 'path';

const app = express();

// Configurar ruta estática
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Ruta principal para index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

export default app;
