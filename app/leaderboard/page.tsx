// page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Navbar } from "@/components/component/navbar";
import { getLeaderboardData } from "@/lib/leaderboardManager";

interface User {
  name: string;
  money: number;
}

export default async function Leaderboard() {
  const users = await getLeaderboardData();

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center h-screen bg-muted/40">
        <div className="container">
          <div className="mb-8 md:mb-12 flex justify-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Placar De Liderança
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-[80%]">
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Top Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead className="text-2xl font-bold">
                          Jogador
                        </TableHead>
                        <TableHead className="text-right text-2xl font-bold">
                          Dinheiro
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user: User, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-2xl font-bold">
                                {user.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-2xl font-bold">
                            $ {user.money}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
