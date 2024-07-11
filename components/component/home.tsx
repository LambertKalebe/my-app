import Image from "next/image"
export function Home() {
  return (
    <main className="flex-1 bg-muted/40 py-8 md:py-12">
      <div className="container">
        <div className="mb-8 md:mb-12 flex justify-center">
          <h1 className="text-3xl font-bold md:text-4xl">CardsLuck</h1>
        </div>
        <div className="grid justify-center">
          <div className="relative group overflow-hidden rounded-lg">
            <Image
              src="/espadas.jpg"
              alt="Game Wallpaper"
              width={400}
              height={400}
            />
            <div className="absolute inset-0 bg-primary/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
              <span className="text-primary-foreground font-medium">Jogar</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
