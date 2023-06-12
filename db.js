const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

//all user
module.exports.usersCollection = client.db("mindfulmove").collection("users");

//all collections
module.exports.classesCollection = client
  .db("mindfulmove")
  .collection("classes");
//all collections
module.exports.paymentCollection = client
  .db("mindfulmove")
  .collection("payments");
