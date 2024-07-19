'use client'
import Link from "next/link";
import Image from "next/image";
import { Navbar } from '@/components/component/navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-muted/40 py-8 md:py-12">
        <div className="container">
          <div className="mb-8 md:mb-12 flex justify-center">
            <h1 className="text-3xl font-bold md:text-4xl">Jogos</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
            <Link href="/cardsluck" className="w-full h-full">
              <div className="relative group overflow-hidden rounded-lg border border-white">
                <Image
                  src="/cardsLuckLogo.png"
                  alt="Game Wallpaper"
                  width={500}
                  height={500}
                  className="aspect-square object-cover w-full h-full bg-color"
                />
                <div className="absolute inset-0 bg-primary/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">CardsLuck</span>
                </div>
              </div>
              <h2 className="text-center mt-2 text-lg font-semibold">CardsLuck</h2>
            </Link>
            <Link href="/slotmachine" className="w-full h-full">
              <div className="relative group overflow-hidden rounded-lg border border-white">
                <Image
                  src="/TigerLogo.png"
                  alt="Game Wallpaper"
                  width={500}
                  height={500}
                  className="aspect-square object-cover w-full h-full bg-color"
                />
                <div className="absolute inset-0 bg-primary/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">Tigrão</span>
                </div>
              </div>
              <h2 className="text-center mt-2 text-lg font-semibold">Tigrão</h2>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}