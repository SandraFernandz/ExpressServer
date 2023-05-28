const express = require('express');
const app = express();

const { infoCursos } = require('./cursos.js');

console.log(infoCursos);

//Routing

app.get('/', (req, res) => {
  res.send('Mi primer servidor de 💻 Cursos 💻');
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto ${PUERTO}`);
});
