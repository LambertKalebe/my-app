'use client';
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import slotMachineManipulator from "@/lib/slotMachineManipuler";
import { Navbar } from "@/components/component/navbar";

const images = [
  '/seven.svg',   // ID 0
  '/heart.svg', // ID 1
  '/diamond.svg', // ID 2
  '/citrus.svg',   // ID 3
  '/coin.svg', // ID 4
  '/horseshoe.svg', // ID 5
  '/clover.svg',   // ID 6
  '/melon.svg',    // ID 7
];

export default function Component() {
  const [slots, setSlots] = useState<React.ReactElement[]>([]);
  const [betValue, setBetValue] = useState<number | null>(null);
  const [winningSlots, setWinningSlots] = useState<number[]>([]); // Para armazenar os índices vencedores

  // Função para gerar slots aleatórios
  const generateSlots = () => {
    return Array.from({ length: 9 }, () => {
      const randomId = Math.floor(Math.random() * images.length);
      return (
        <motion.div
          key={Math.random()}
          className="bg-muted/50 rounded-lg w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0, 0.71, 0.2, 1],
            scale: {
              type: "spring",
              damping: 7,
              stiffness: 100,
              restDelta: 0.001
            }
          }}
        >
          <Image src={images[randomId]} alt={`Slot ${randomId}`} width={200} height={200} className="w-full h-full object-cover" />
        </motion.div>
      );
    });
  };

  // Gera os slots iniciais ao carregar a página
  useEffect(() => {
    setSlots(generateSlots());
  }, []);

  const handleBetValueChange = (value: number) => {
    if (value === 5 || value === 15 || value === 25) {
      setBetValue(value);
    } else {
      alert('Selecione um valor de aposta válido!');
    }
  };

  const handleSpin = (betValue: number) => {
    if (!betValue) {
      alert('Selecione um valor de aposta!');
      return;
    }
    
    // Limpa os slots anteriores
    setSlots([]);
    setWinningSlots([]); // Reseta os slots vencedores
  
    // Gera os novos slots com animação
    const newSlots = generateSlots();
    setSlots(newSlots);
  
    // Verifica se há uma vitória e obtém o ID da imagem vencedora
    const winningImageId = checkForWin(newSlots);
    
    // Envia o ID da imagem vencedora para a função slotMachineManipulator
    slotMachineManipulator(betValue, winningImageId);
  };

  const checkForWin = (newSlots: React.ReactElement[]) => {
    const grid = newSlots.map((slot, index) => {
      return { symbol: slot.props.children.props.src, index }; // Usar src da imagem
    });
  
    // Verificação de linhas, colunas e diagonais
    const winningCombinations = [
      // Linhas
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // Colunas
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // Diagonais
      [0, 4, 8], [2, 4, 6]
    ];
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (grid[a].symbol === grid[b].symbol && grid[b].symbol === grid[c].symbol) {
        setWinningSlots([a, b, c]); // Armazena os índices vencedores
  
        // Encontrar o ID da imagem vencedora
        const winningImageId = images.findIndex(img => img === grid[a].symbol);
        return winningImageId; // Retorna o ID da imagem vencedora
      }
    }
    return -1; // Retorna -1 se não houver vitória
  };

  return (
    <>
    <Navbar></Navbar>
    <main className="flex flex-col items-center justify-center h-screen bg-muted/40">
      <div className="container">
        <div className="mb-8 md:mb-12 flex justify-center">
          <h1 className="text-3xl font-bold md:text-4xl">Tigrão</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-[90%] sm:max-w-[80%]">
            <Card>
              <CardHeader className="border-b flex justify-center items-center mb-10">
                <CardTitle>Spin the Reels</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-6 sm:gap-8">
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {slots.map((slot, index) => (
                    <div key={index} className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-lg ${winningSlots.includes(index) ? 'bg-purple' : 'bg-muted/50'}`}>
                      {React.cloneElement(slot, {
                        className: `${slot.props.className} ${winningSlots.includes(index) ? 'text-black' : ''}`
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Button variant="outline" className={`w-full max-w-[80px] sm:max-w-[100px] ${betValue === 5 ? 'bg-purple' : ''}`} onClick={() => handleBetValueChange(5)}>
                    $5
                  </Button>
                  <Button variant="outline" className={`w-full max-w-[80px] sm:max-w-[100px] ${betValue === 15 ? 'bg-purple' : ''}`} onClick={() => handleBetValueChange(15)}>
                    $15
                  </Button>
                  <Button variant="outline" className={`w-full max-w-[80px] sm:max-w-[100px] ${betValue === 25 ? 'bg-purple' : ''}`} onClick={() => handleBetValueChange(25)}>
                    $25
                  </Button>
                  <Button className="w-full max-w-[150px] sm:max-w-[200px]" onClick={() => handleSpin(betValue!)} disabled={!betValue}>
                    Spin
                  </Button>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold"></div>
                  <div className="text-muted-foreground">Acerte 3 simbolos para ganhar!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}