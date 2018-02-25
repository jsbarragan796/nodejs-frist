const express = require("express");
const app = express();

const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

function findDocuments(db, callback) {
  const collection = db.collection("tweets");
  collection.find({}).toArray((err, docs) => {
    if (err) throw err;
    // console.log(docs);
    callback(docs);
  });
}

function findDocumentsParam(db, callback,search) {
  const collection = db.collection("tweets");
  console.log("busqueda search!");
  var query ={
    $or:[
      {"user.screen_name":{$regex : search, $options : "i"}},
      {text:{$regex : search, $options : "i"}}
    ]
  };
  collection.find(query).toArray((err, docs) => {
    if (err) throw err;
    console.log("busqueda search!!!");
    callback(docs);
  });
}


function getTweets(search,callback) {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    console.log("Connected");
    const db = client.db("webdev_tweets");
    if(search==""){
      findDocuments(db, callback);
    }
    else{
      findDocumentsParam(db, callback,search);
    }

    client.close();
  });
}

app.use(express.static("public"));
app.get("/getTweets", (req, res) => {
  console.log("getTweets");
  console.log(req.query.search);
  const callback = (tweets) => res.send(tweets);
  getTweets(req.query.search,callback);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
