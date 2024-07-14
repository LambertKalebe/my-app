
'use client'
import Link from "next/link";
import Image from "next/image"
import { useEffect } from "react";
import checkUser from "@/lib/userDataManipuler";
import { Navbar } from '@/components/component/navbar'

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkUser(); 
    }
  }, []);
  return (
    <>
    <Navbar />
    <main className="flex-1 bg-muted/40 py-8 md:py-12">
      <div className="container">
        <div className="mb-8 md:mb-12 flex justify-center">
          <h1 className="text-3xl font-bold md:text-4xl">CardsLuck</h1>
        </div>
        <div className="game grid justify-center">
          <Link href="/cardsluck" className="w-full h-full">
            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/iconGame.png"
                alt="Game Wallpaper"
                width={500}
                height={500}
                className="aspect-square object-cover w-full h-full bg-color"
              />
              <div className="absolute inset-0 bg-primary/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                <span className="text-primary-foreground font-medium">Jogar</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
    </>
    
  )
}