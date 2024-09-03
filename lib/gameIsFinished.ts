"use server";
import { getDatabase } from "./db";
import { ObjectId } from "mongodb"; // Certifique-se de importar ObjectId

async function gameIsFinished() {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection("GameData");

    // Converte a string do cookie para ObjectId
    const data = await usersCollection.findOne({
      _id: new ObjectId("66d760bd52e9fab4f8d6b3c6"),
    });

    if (data) {
      console.log("Acabou?" + data.IsGameFinished);
      return data.IsGameFinished;
    } else {
      console.log("GameData não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("gameIsFinished: Erro ao ler a DataGame:", error);
    return null;
  }
}

export default gameIsFinished;
