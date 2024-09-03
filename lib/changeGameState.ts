"use server";
import { cookies } from "next/headers";
import { getDatabase } from "./db";
import { ObjectId } from "mongodb"; // Certifique-se de importar ObjectId

async function changeGameState() {
  try {
    const db = await getDatabase();
    const gameData = db.collection("GameData");

    // Converte a string do cookie para ObjectId
    const data = await gameData.findOne({
      _id: new ObjectId("66d760bd52e9fab4f8d6b3c6"),
    });

    if (data) {
      // Inverte o valor de IsGameFinished
      const newGameState = !data.IsGameFinished;

      // Atualiza o documento com o novo estado de IsGameFinished
      const result = await gameData.updateOne(
        { _id: new ObjectId("66d760bd52e9fab4f8d6b3c6") },
        { $set: { IsGameFinished: newGameState } }
      );

      if (result.modifiedCount > 0) {
        console.log(`Estado do jogo atualizado para: ${newGameState}`);
      } else {
        console.log("Nenhuma modificação foi feita.");
      }
    } else {
      console.log("Data não encontrada.");
      return null;
    }
  } catch (error) {
    console.error(
      "changeGameState: Erro ao atualizar o estado do jogo:",
      error
    );
    return null;
  }
}

export default changeGameState;
