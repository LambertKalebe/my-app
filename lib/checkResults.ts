"use server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb"; // Importa ObjectId
import { getDatabase } from "./db";
import gameIsFinished from "./gameIsFinished";

async function checkResults(): Promise<"red" | "blue" | "yellow" | "none"> {
  try {
    const db = await getDatabase();
    const cardbetsCollection = db.collection("cardbets");
    const usersCollection = db.collection("users");
    const votesCount = await cardbetsCollection.countDocuments({});
    const id = cookies().get("id")?.value;
    const jogoAcabou = await gameIsFinished();

    if (jogoAcabou) {
      const redVotes = await cardbetsCollection.countDocuments({ card: "red" });
      const blueVotes = await cardbetsCollection.countDocuments({
        card: "blue",
      });
      const yellowVotes = await cardbetsCollection.countDocuments({
        card: "yellow",
      });

      const minVotes = Math.min(redVotes, blueVotes, yellowVotes);
      let winningCard: "red" | "blue" | "yellow" | "none" = "none";

      if (redVotes === minVotes && blueVotes === minVotes) {
        winningCard = "blue";
      } else if (redVotes === minVotes && yellowVotes === minVotes) {
        winningCard = "yellow";
      } else if (blueVotes === minVotes && yellowVotes === minVotes) {
        winningCard = "yellow";
      } else if (redVotes === minVotes) {
        winningCard = "red";
      } else if (blueVotes === minVotes) {
        winningCard = "blue";
      } else if (yellowVotes === minVotes) {
        winningCard = "yellow";
      }

      console.log(`CARTÃO VENCEDOR: ${winningCard}`);

      // Verifica se o ID do usuário está presente em um voto do cartão vencedor
      const userVote = await cardbetsCollection.findOne({
        card: winningCard,
        id: new ObjectId(id),
      }); // Converte o id para ObjectId
      if (userVote && !userVote.rewarded) {
        // Multiplica o valor da aposta do usuário por 2 e soma ao dinheiro dele
        const updatedMoney = userVote.bet * 2;
        await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { money: updatedMoney } }
        ); // Converte o id para ObjectId
        console.log(`Dinheiro do usuário ${id} atualizado: ${updatedMoney}`);

        // Marca o voto como recompensado
        await cardbetsCollection.updateOne(
          { _id: userVote._id },
          { $set: { rewarded: true } }
        );
      }

      return winningCard;
    }

    console.log("CARTÃO VENCEDOR: none");
    return "none";
  } catch (error) {
    console.error("checkResults: Erro ao obter os resultados:", error);
    return "none";
  }
}

export default checkResults;
