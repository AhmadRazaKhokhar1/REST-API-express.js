import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const uri = process.env.URI;
const data = [];

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to propagate it further if needed
  }
}
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("school_data").command({ ping: 1 });
      console.log("You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
const userController = {
  post: async (req, res) => {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await connectToDatabase();

      const database = client.db('school_data');
      const collection = database.collection('registered_students');

      const newData = {
        name: req.body.name,
        father: req.body.father,
        classes: req.body.classes,
        major: req.body.major,
        phone: req.body.phone,
      };

      data.push(newData);
      const result = await collection.insertOne(newData);

      console.log(`Inserted document with _id: ${result.insertedId}`);
      res.status(200).send('NEW USER ADDED!');
    } catch (error) {
      console.error(`There is an ERROR: ${error} in user controller`);
      res.status(500).send('Internal Server Error');
    } finally {
      await client.close();
    }
  },

  get: async (req, res) => {
    res.json(data);
  },
};

export default userController;
