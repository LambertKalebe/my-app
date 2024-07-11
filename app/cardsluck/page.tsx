'use client';
import { useState } from 'react';
import { Navbar } from "@/components/component/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import saveVote from '@/lib/saveVote'; // Importa a função saveVote
import checkMoney from '@/lib/checkMoney';

export default function CardsLuckPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleCardClick = (card: string) => {
    setSelectedCard(card);
  };

  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
  };

  const handleConfirmClick = async () => {
    const userMoney = await checkMoney(); // Use 'await' to get the value from the Promise

    if (selectedCard && selectedButton) {
      const betAmount = parseInt(selectedButton);
      if (betAmount > userMoney) {
        alert('Você não tem dinheiro suficiente para essa aposta.');
      } else {
        saveVote(selectedCard, betAmount); // Replace 'uuid-do-usuario' with the actual user UUID
        // Clear the selections after saving
        setSelectedCard(null);
        setSelectedButton(null);
      }
    } else {
      alert('Por favor, selecione um cartão e digite uma aposta antes de confirmar.');
    }
  };

  const cardClasses = (card: string): string =>
    `cursor-pointer w-[100px] h-[150px] md:w-[300px] md:h-[400px] bg-cover bg-center transition-all duration-300 ${
      selectedCard === card ? 'transform scale-125' : 'hover:scale-110'
    }`;

  const buttonClasses = (button: string): string =>
    `w-full max-w-[150px] transition-all duration-300 ${
      selectedButton === button ? 'bg-blue-500 text-white transform scale-105' : ''
    }`;

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center h-screen bg-muted/40">
        <div className="container">
          <div className="mb-8 md:mb-20 flex justify-center">
            <h1 className="text-3xl font-bold md:text-4xl">Votação</h1>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4">
              <div className="transform -rotate-3" onClick={() => handleCardClick('red')}>
                <Card className={`bg-red-500 text-red-900 hover:bg-red-400 ${cardClasses('red')}`} style={{ backgroundImage: "url('/images/red-background.jpg')" }}>
                  <CardContent className="flex items-center justify-center p-6 bg-opacity-50">
                    <span className="text-4xl font-semibold">Red</span>
                  </CardContent>
                </Card>
              </div>
              <div className="z-10 transform scale-110" onClick={() => handleCardClick('blue')}>
                <Card className={`bg-blue-500 text-blue-900 hover:bg-blue-400 ${cardClasses('blue')}`} style={{ backgroundImage: "url('/images/blue-background.jpg')" }}>
                  <CardContent className="flex items-center justify-center p-6 bg-opacity-50">
                    <span className="text-4xl font-semibold">Blue</span>
                  </CardContent>
                </Card>
              </div>
              <div className="transform rotate-3" onClick={() => handleCardClick('yellow')}>
                <Card className={`bg-yellow-500 text-yellow-900 hover:bg-yellow-400 ${cardClasses('yellow')}`} style={{ backgroundImage: "url('/espadass.jpg')" }}>
                  <CardContent className="flex items-center justify-center p-6 bg-opacity-50">
                    <span className="text-4xl font-semibold">Yellow</span>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold">Digite sua aposta</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button className={buttonClasses('25')} onClick={() => handleButtonClick('25')}>25</Button>
                <Button variant="ghost" disabled className="w-full max-w-[150px]"></Button>
                <Button className={buttonClasses('50')} onClick={() => handleButtonClick('50')}>50</Button>
                <Button className={buttonClasses('confirm')} onClick={handleConfirmClick}>Confirmar</Button>
                <Button className={buttonClasses('75')} onClick={() => handleButtonClick('75')}>75</Button>
                <Button variant="ghost" disabled className="w-full max-w-[150px]"></Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
