const express = require('express');
const app = express();

const { infoCursos } = require('./datos/cursos.js');

console.log(infoCursos);

//app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);

// Routing

app.get('/', (req, res) => {
  res.send('Mi primer servidor de 💻 Cursos 💻 con Express');
});

app.get('/api/cursos', (req, res) => {
  res.send(infoCursos);
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});
