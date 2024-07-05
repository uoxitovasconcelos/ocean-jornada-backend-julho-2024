const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
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

  const db = client.db(dbName)
  const collection = db.collection('item')

  // Read All - [GET] /item
  app.get('/item', async function (req, res) {
    // Obter todos os documentos da collection
    const documentos = await collection.find().toArray()    

    // Pegamos os documentos e enviamos  como resposta HTTP
    res.send(documentos)
  })

  //Sinalizamos para o Express que vamos usar JSON no Body
  app.use(express.json())

  //Create - [POST] /item
  app.post('/item', async function (req, res) {
    // Obtemos o nome enviado no Request Body
    const item = req.body

    // Inserimos o item na collection
    await collection.insertOne(item)

    // Exibe o item que foi adicionado
    res.send(item)
  })

  // Read By ID - [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    // Acessamos o parametro de rota ID
    const id = req.params.id

    // Acessamos o item na collection pelo ObjectId
    const item = await collection.findOne({ _id: new ObjectId(id) })

    // Enviamos o item obtido como resposta
    res.send(item)
  })

  //Update - [PUT] /item/:id
  app.put('/item/:id', async function (req, res) {
    //Acessamos o ID do parametro de rota
    const id = req.params.id

    //Acessamos o novoItem no body da requisição
    const novoItem = req.body

    // Atualizamos a collection com a nova informação
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: novoItem }
    )

    // Enviamos uma mensagem de suscesso
    res.send('Item atualizado com sucesso: ' + id)
  })

  app.listen(3000)
}

main()
