"use client";
import { Button } from "@/components/ui/button";
import deleteCollection from "@/lib/deleteCollection";
import gameIsFinished from "@/lib/gameIsFinished";
import changeGameState from "@/lib/changeGameState";
import { useState } from "react";

function DeleteCardBetsPage() {
  const [nameOfButton, setNameOfButton] = useState("Terminar Jogo");

  const handleDeleteClick = async () => {
    try {
      if (await gameIsFinished()) {
        await deleteCollection();
        await changeGameState();
        setNameOfButton("Terminar Jogo");
      } else {
        await changeGameState();
        setNameOfButton("Apagar Votos e Continuar o Jogo");
      }
    } catch (error) {
      console.error("Erro ao deletar a coleção:", error);
      alert(
        "Ocorreu um erro ao deletar a coleção. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <>
      <main className="h-full w-full">
        <Button
          variant="destructive"
          className="h-full w-full"
          onClick={handleDeleteClick}
        >
          {nameOfButton}
        </Button>
      </main>
    </>
  );
}

export default DeleteCardBetsPage;
