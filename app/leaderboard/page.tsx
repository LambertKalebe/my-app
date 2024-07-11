import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Navbar } from "@/components/component/navbar"

export default function Leaderboard() {
  return (
    <>
    <Navbar/>
    <main className="flex-1 bg-muted/40 py-8 md:py-12">
      <div className="container">
        <div className="mb-8 md:mb-12 flex justify-center">
          <h1 className="text-3xl font-bold md:text-4xl">Placar</h1>
        </div>
        <div className="grid gap-4 justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Melhores Jogadores</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Jogador</TableHead>
                    <TableHead>Total Acumulado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                      </div>
                    </TableCell>
                    <TableCell>12,345</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JA</AvatarFallback>
                        </Avatar>
                        <span>Jane Ahn</span>
                      </div>
                    </TableCell>
                    <TableCell>11,987</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <span>Sarah Mayer</span>
                      </div>
                    </TableCell>
                    <TableCell>10,654</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>LW</AvatarFallback>
                        </Avatar>
                        <span>Liam Watts</span>
                      </div>
                    </TableCell>
                    <TableCell>9,876</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>EM</AvatarFallback>
                        </Avatar>
                        <span>Emily Martinez</span>
                      </div>
                    </TableCell>
                    <TableCell>8,543</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
    </>
  )
}
