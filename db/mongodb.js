import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

const options = {};

let client;
let clientPromise;

if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}
export default clientPromise;
