'use client'
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { checkMoney } from "@/lib/userDataManipuler"

export function Navbar() {
  const [money, setMoney] = useState(100); // initialize money state to 100

  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    checkMoney().then(newMoney => {
      setMoney(newMoney); // update money state with new value
    });
  }, [open]);

  return (
    <header className="bg-background border-b px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-semibold">MOSTRA</span>
      </Link>
      <div>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Mudar Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Link href="/" className="flex items-center gap-2" prefetch={false}>
                Início
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/leaderboard" className="flex items-center gap-2" prefetch={false}>
                Placar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/info" className="flex items-center gap-2" prefetch={false}>
                Sobre
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              R$ {money}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}