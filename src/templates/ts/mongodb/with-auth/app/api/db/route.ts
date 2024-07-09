import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017", {});
const db = client.db();
const collection = db.collection("mycollection");

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email } = req.body;
    const result = await collection.insertOne({ name, email });
    res.status(201).json({ message: "Record inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error inserting data" });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting data" });
  }
}
