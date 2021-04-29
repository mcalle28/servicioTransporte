const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function llamadoDistancia(origen, destino,transporteTipo){
  return Math.random() * (1000 - 10) + 10;
}

function llamadoTiempo(origen, destino,transporteTipo){
  tiempo= Math.random() * (100 - 10) + 10;
  if(transporte='Aereo'){

    tiempo=tiempo/100;
  }
  else if(transporte='Maritimo'){
    tiempo=tiempo/10;
  }

  return tiempo;

}

app.post('/transporte', (req, res) => {
  body=req.body;
  distanciaRecorrido = llamadoDistancia(body.origen, body.destino, body.transporteTipo);
  tiempoRecorrido = llamadoTiempo(body.origen, body.destino,body.transporteTipo);
  transporteUsado=body.transporteTipo;
  res.send({
    distanciaRecorrido,tiempoRecorrido, transporteUsado
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})