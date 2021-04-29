const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

function llamadoDistancia() {
  return Math.random() * (1000 - 10) + 10;
}

function llamadoTiempo(transporte) {
  let tiempo = Math.random() * 100;
  if (transporte == 'Aereo') {
    tiempo = tiempo / 100;
  } else if (transporte == 'Maritimo') {
    tiempo = tiempo / 10;
  }
  return Math.floor(tiempo);
}

app.post('/transporte', cors(), (req, res) => {
  body = req.body;
  distanciaRecorrido = llamadoDistancia(
    body.origen,
    body.destino,
    body.transporteTipo
  );
  tiempoRecorrido = llamadoTiempo(
    body.origen,
    body.destino,
    body.transporteTipo
  );
  transporteUsado = body.transporteTipo;
  res.send({
    distanciaRecorrido: `${distanciaRecorrido} km`,
    tiempoRecorrido: `${tiempoRecorrido} s`,
    transporteUsado,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
