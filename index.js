const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/oi', function (req, res) {
    res.send('Olá Mundo!')
  })

//Lista de Personagens
const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

// Read All - [GET] /item
app.get('/item', function(req, res) {
  //Pegamos a lista e enviamos  como resposta HTTP
  res.send(lista)
})

//Sinalizamos para o Express que vamos usar JSON no Body
app.use(express.json())

//Create - [POST] /item
app.post('/item', function (req, res) {
  // Obtemos o nome enviado no Request Body
  const item = req.body.nome
  
  // Inserimos o item no final da lista
  lista.push(item)

  // Enviamos uma mensagem de suscesso
  res.send('Item criado com sucesso')
})

app.listen(3000)