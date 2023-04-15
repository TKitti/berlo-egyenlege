const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const port = process.env.PORT || 3000;
const path = require('path');



async function main(){
  const client = new MongoClient(dotenv.parsed.CONNECTION_STRING, {
    useNewUrlParser: true,
    dbName: 'balance-sheet',
  });

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, ()=> {
  console.log("listening to the server on http://localhost:3000")
});