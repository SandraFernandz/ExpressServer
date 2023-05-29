const express = require('express');

const { programacion } = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

// Middleware
routerProgramacion.use(express.json());

routerProgramacion.get('/', (req, res) => {
  res.send(programacion);
});

// Parámetros URL en ROUTING (el parámetro es lo que sigue a los dos puntos, p.e. 'lenguajes' aquí)

routerProgramacion.get('/:lenguaje', (req, res) => {
  // accedemos al parámetro a través del objeto disponible en 'req', 'params' y luego el nombre del parámetro q hemos creado 'lenguaje'.
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  if (req.query.ordenar === 'vistas') {
    return res.send(resultados.sort((a, b) => b.vistas - a.vistas));
  }
  res.send(resultados);
});

// usando dos parmámetros
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );
  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }

  res.send(resultados);
});

routerProgramacion.post('/', (req, res) => {
  // extraemos cuerpo de la solicitud para incluir nuevo curso
  let cursoNuevo = req.body;
  // agregarlo a cursos programacion
  programacion.push(cursoNuevo);
  res.send(JSON.stringify(programacion));
});

routerProgramacion.put('/:id', (req, res) => {
  //contenido del contenido del cuerpo de solicitud
  //en cuerpo solicitud recibimos id actualizado
  const cursoActualizado = req.body;
  //extraemos id del curso
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.patch('/:id', (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }
  res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;
