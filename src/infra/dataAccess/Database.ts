import mongoose from "mongoose";

const db = mongoose.connection;

export class Database {
  static async connect(host: string, options: Record<string, any>) {
    Database.setUpListners();
    await mongoose.connect(host, options);
  }

  private static setUpListners() {
    db.on("connecting", () => {
      console.log("connecting to MongoDB...");
    });

    db.on("error", (error) => {
      console.error(`Error in MongoDb connection: ${  error}`);
      mongoose.disconnect();
    });
    db.on("connected", () => {
      console.log("MongoDB connected!");
    });
    db.once("open", () => {
      console.log("MongoDB connection opened!");
    });
    db.on("reconnected", () => {
      console.log("MongoDB reconnected!");
    });
    db.on("disconnected", function () {
      console.log("MongoDB disconnected!");
      mongoose.connect(this.host, this.options);
    });
  }
}
