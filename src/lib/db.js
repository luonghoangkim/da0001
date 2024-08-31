import mongoose from "mongoose";

const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MongoURL);
    console.log("Connect success");
  } catch(err) {
    console.log(err);
  }
};

export default connectToMongodb;
