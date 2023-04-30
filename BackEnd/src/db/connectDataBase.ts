import mongoose from "mongoose";

(async function () {
  try {
    await mongoose.connect(`mongodb+srv://sZKiu:${process.env.DB_PASSWORD}@blogdb.buuf3en.mongodb.net/storydots_db?retryWrites=true&w=majority`);
    console.log("Conection Succesfully");
  } catch (err) {
    console.log(err);
  }
})();
