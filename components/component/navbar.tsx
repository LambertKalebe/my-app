"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import checkMoney from "@/lib/checkMoney";
import checkName from "@/lib/checkName";
import logout from "@/lib/logout";
import { useRouter } from "next/navigation";
import isAdm from "@/lib/isAdm";
export function Navbar() {
  const [money, setMoney] = useState(100); // Inicializa o estado de dinheiro em 100
  const [name, setName] = useState("");
  const router = useRouter();
  // Estados para controlar a abertura dos menus
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [checkIsAdm, setCheckIsAdm] = useState(false);

  const onClickEvent = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    checkMoney().then((newMoney) => {
      setMoney(newMoney); // Atualiza o estado de dinheiro com o novo valor
    });
    checkName().then((newName) => {
      setName(newName); // Atualiza o estado de nome com o novo valor
    });
    isAdm().then((isAdmin) => {
      setCheckIsAdm(isAdmin); // Atualiza o estado de isAdm com o valor retornado
    });
  }, [openMenu2]); // Atualiza quando o menu 2 é aberto

  return (
    <header className="bg-background border-b px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-semibold">MOSTRA</span>
      </Link>
      <div className="flex gap-4">
        <DropdownMenu open={openMenu1} onOpenChange={setOpenMenu1}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Mudar Menu 1</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-30">
            <DropdownMenuLabel>Páginas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/"
                className="flex items-center gap-2 w-full"
                prefetch={false}
              >
                Início
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 w-full"
                prefetch={false}
              >
                Placar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/info"
                className="flex items-center gap-2 w-full"
                prefetch={false}
              >
                Sobre
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Segundo Dropdown Menu */}
        <DropdownMenu open={openMenu2} onOpenChange={setOpenMenu2}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon2 className="h-6 w-6" />
              <span className="sr-only">Mudar Menu 2</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-30">
            <DropdownMenuLabel>Usuário</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center justify-between">{name}</div>
            </DropdownMenuItem>
            <DropdownMenuItem>R$ {money}</DropdownMenuItem>
            {checkIsAdm && (
              <DropdownMenuItem>
                <Link
                  href="/Panel"
                  className="flex items-center gap-2 w-full"
                  prefetch={false}
                >
                  Menu ADM
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <Button
                variant="destructive"
                className="w-full"
                onClick={onClickEvent}
              >
                <span>Sair</span>
              </Button>
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

function MenuIcon2(props: React.SVGAttributes<SVGElement>) {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
