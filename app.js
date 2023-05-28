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

app.get('/api/cursos/matematicas', (req, res) => {
  res.send(infoCursos.matematicas);
});

// Parámetros URL en ROUTING (el parámetro es lo que sigue a los dos puntos, p.e. 'lenguajes' aquí)

app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
  // accedemos al parámetro a través del objeto disponible en 'req', 'params' y luego el nombre del parámetro q hemos creado 'lenguaje'.
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  res.send(resultados);
});

app.get('/api/cursos/matematicas/:tema', (req, res) => {
  const tema = req.params.tema;
  const resultados = infoCursos.matematicas.filter(
    (curso) => curso.tema === tema
  );

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${tema}`);
  }
  res.send(resultados);
});

// usando dos parmámetros
app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = infoCursos.programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );
  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }

  if (req.query.ordenar === 'vistas') {
    return res.send(resultados.sort((a, b) => b.vistas - a.vistas));
  }

  res.send(resultados);
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});
