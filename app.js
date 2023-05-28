const express = require('express');
const app = express();

const { infoCursos } = require('./cursos.js');

console.log(infoCursos);

//Routing

app.get('/', (req, res) => {
  res.send('Mi primer servidor de 💻 Cursos 💻 con Express');
});

app.get('/api/cursos', (req, res) => {
  res.send(infoCursos);
});

app.get('/api/cursos/programacion', (req, res) => {
  res.send(infoCursos.programacion);
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});
