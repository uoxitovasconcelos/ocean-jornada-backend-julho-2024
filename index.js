const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

const dbUrl = 'mongodb+srv://admin:SUqSRG6A9g3cGDOI@cluster0.lvz4lvk.mongodb.net'
const dbName = 'ocean-jornada-backend'

const client = new MongoClient(dbUrl)

async function main() {
  console.log('Conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!')

  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  app.get('/oi', function (req, res) {
    res.send('Olá Mundo!')
  })

  // Lista de Personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

  // Read All - [GET] /item
  app.get('/item', function (req, res) {
    // Pegamos a lista e enviamos  como resposta HTTP
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

  // Read By ID - [GET] /item/:id
  app.get('/item/:id', function (req, res) {
    // Acessamos o parametro de rota ID
    const id = req.params.id

    // Acessamos o item na lista pelo ínidice corrigido (id - 1)
    const item = lista[id - 1]

    // Enviamos o item obtido como resposta
    res.send(item)
  })

  //Update - [PUT] /item/:id
  app.put('/item/:id', function (req, res) {
    //Acessamos o ID do parametro de rota
    const id = req.params.id

    //Acessamos o body da requisição, com os dados
    //a serem atualizados
    const novoItem = req.body.nome

    // Atualizamos esse novoItem na lista, usando o índice
    lista[id - 1] = novoItem

    // Enviamos uma mensagem de suscesso
    res.send('Item atualizado com sucesso: ' + id)
  })

  app.listen(3000)
}

main()
