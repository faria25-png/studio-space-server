const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("studioSpaceDB");
    const servicesCollection = database.collection("services");

    app.get('/services', async (req, res) => {
      const cursor = servicesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post('/services', async (req, res) => {
      const newService = req.body;
      const result = await servicesCollection.insertOne(newService);
      res.send(result);
    });

    console.log("Database connected successfully!");
  } finally {
    
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('StudioSpace Server is running...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});