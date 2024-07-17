"use client";
import { Button } from "@/components/ui/button";
import { deleteCollection } from "@/lib/gameManipuler";

export default function deleteCardBetsPage() {
  const handleDeleteClick = async () => {
    try {
      await deleteCollection();
      alert('Coleção "cardbets" deletada com sucesso!');
    } catch (error) {
      console.error("Erro ao deletar a coleção:", error);
      alert(
        "Ocorreu um erro ao deletar a coleção. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <>
      <main className="h-full w-full">
        <Button
          variant="destructive"
          className="h-full w-full"
          onClick={handleDeleteClick}
        >
          Deletar Coleção cardbets
        </Button>
      </main>
    </>
  );
}
