"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/component/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import saveVote, {
  checkIfAlreadyVoted,
  VoteCount,
  checkResults,
} from "@/lib/gameManipuler";
import { checkMoney } from "@/lib/userManager";

export function CardsLuckPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState<boolean>(false);
  const [winningCard, setWinningCard] = useState<
    "red" | "blue" | "yellow" | "none"
  >("none");

  useEffect(() => {
    const interval = setInterval(async () => {
      const cardColor = await checkResults();
      setWinningCard(cardColor);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = async (card: string) => {
    if (await VoteCount()) {
      alert("Limite de votos atingido");
    }
    setSelectedCard(card);
  };

  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  const handleConfirmClick = async () => {
    const userMoney = await checkMoney();

    if (selectedCard && selectedButton) {
      const betAmount = parseInt(selectedButton);
      if (betAmount > userMoney) {
        alert("Você não tem dinheiro suficiente para essa aposta.");
      } else if (await checkIfAlreadyVoted()) {
        setIsConfirmDisabled(true);
      } else {
        const voteSuccess = await saveVote(selectedCard, betAmount);
        if (voteSuccess) {
          // Clear the selections after saving
          setSelectedCard(null);
          setSelectedButton(null);
        }
      }
    } else {
      alert(
        "Por favor, selecione um cartão e digite uma aposta antes de confirmar."
      );
    }
  };

  const cardClasses = (card: string): string =>
    `cursor-pointer w-[100px] h-[150px] md:w-[300px] md:h-[400px] bg-cover bg-center transition-all duration-300 ${
      selectedCard === card ? "transform scale-110" : "hover:scale-110"
    } ${winningCard === card ? "transform scale-125" : ""}`;

  const buttonClasses = (button: string): string =>
    `w-full max-w-[150px] transition-all duration-300 ${
      selectedButton === button
        ? "bg-blue-500 text-white transform scale-105"
        : ""
    }`;

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center h-screen bg-muted/40">
        <div className="container">
          <div className="mb-8 md:mb-20 flex justify-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Vote no seu cartão e teste sua sorte!
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4">
              <div
                className="transform -rotate-3"
                onClick={() => handleCardClick("blue")}
                data-card="blue"
              >
                <Card
                  className={`bg-bluee text-blue-900 shadow-current shadow-xl ${cardClasses(
                    "blue"
                  )}`}
                  style={{ backgroundImage: "url('/blue.png')" }}
                >
                  <CardContent className="flex items-center justify-center p-6 bg-opacity-50">
                    {winningCard === "blue" && <h1>VENCEDOR</h1>}
                  </CardContent>
                </Card>
              </div>
              <div
                className="z-10 transform scale-110"
                onClick={() => handleCardClick("red")}
                data-card="red"
              >
                <Card
                  className={`bg-redd text-red-900 shadow-current shadow-xl ${cardClasses(
                    "red"
                  )}`}
                  style={{ backgroundImage: "url('/red.png')" }}
                >
                  <CardContent className="flex items-center justify-center p-6 bg-opacity-50">
                    {winningCard === "red" && <h1>VENCEDOR</h1>}
                  </CardContent>
                </Card>
              </div>
              <div
                className="transform rotate-3"
                onClick={() => handleCardClick("yellow")}
                data-card="yellow"
              >
                <Card
                  className={`bg-yelloww text-yellow-900 shadow-current shadow-xl ${cardClasses(
                    "yellow"
                  )}`}
                  style={{ backgroundImage: "url('/yellow.png')" }}
                >
                  <CardContent className="flex items-center justify-center p-6 bg-opacity-50">
                    {winningCard === "yellow" && <h1>VENCEDOR</h1>}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold">Digite sua aposta</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button
                  className={buttonClasses("25")}
                  onClick={() => handleButtonClick("25")}
                >
                  25
                </Button>
                <Button
                  variant="ghost"
                  disabled
                  className="w-full max-w-[150px]"
                ></Button>
                <Button
                  className={buttonClasses("50")}
                  onClick={() => handleButtonClick("50")}
                >
                  50
                </Button>
                <Button
                  className={buttonClasses("confirm")}
                  onClick={handleConfirmClick}
                  disabled={isConfirmDisabled}
                >
                  Confirmar
                </Button>
                <Button
                  className={buttonClasses("75")}
                  onClick={() => handleButtonClick("75")}
                >
                  75
                </Button>
                <Button
                  variant="ghost"
                  disabled
                  className="w-full max-w-[150px]"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CardsLuckPage;
