const express = require('express');

const routerProgramacion = express.Router();

routerProgramacion.get('/', (req, res) => {
  res.send(infoCursos.programacion);
});

// Parámetros URL en ROUTING (el parámetro es lo que sigue a los dos puntos, p.e. 'lenguajes' aquí)

routerProgramacion.get('/:lenguaje', (req, res) => {
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

// usando dos parmámetros
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
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