const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
  region: 'us-east-2',
  apiVersion: '2012-08-10',
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/transporte', cors(), async (req, res) => {
  try {
    const { transporte } = req.body;
    const transportes = getTransportesMapper(await getTransportes());
    const distanciaRecorrido = Math.round(Math.random() * (1000 - 10) + 10);
    res.send({
      ['Distancia (Km)']: distanciaRecorrido,
      ['Tiempo (Min)']: calcularTiempo(transporte, transportes),
    });
  } catch (e) {
    res.status(500).send({
      error: e.message || 'Something went wrong',
    });
  }
});

function calcularTiempo(transporte, transportes) {
  console.log(transportes[transporte]);
  if (!transportes[transporte]) throw new Error('Transporte no soportado');
  return Math.round(
    (Math.random() * (10000 - 100) + 100) / transportes[transporte]
  );
}

const getTransportes = () => {
  const params = {
    TableName: 'everGreenTransporte',
  };
  return new Promise((resolve, reject) => {
    dynamodb.scan(params, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

function getTransportesMapper(transportes) {
  return transportes.Items.map(({ tipo, velocidad }) => ({
    [tipo.S]: velocidad.N,
  })).reduce((acc, cur) => Object.assign(acc, cur), {});
}
