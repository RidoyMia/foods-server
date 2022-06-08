const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 2000
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://food-collection:food-collection@cluster0.8r5ca.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const FoodsCollection = client.db('food-collection').collection('foods');
async function run(){
    try{
        await client.connect(); 
        app.get('/foods',async(req,res)=>{
        const query = {}
        const cursor = FoodsCollection.find(query);
        const result = await cursor.toArray()
        res.send(result)
        })
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})