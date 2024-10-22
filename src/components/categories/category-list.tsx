import { Edit2, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { useCategories } from "@/hooks/useCategories";

export function CategoryList() {
  const { categories, editingCategory, handleDelete, handleEdit } =
    useCategories();

  return (
    <>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>#ID</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="flex justify-end">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell className="flex justify-end gap-4">
                <Button
                  size="icon"
                  disabled={!!editingCategory}
                  onClick={() => category.id && handleEdit(category.id)}
                >
                  <Edit2 className="size-4" />
                </Button>
                <Button
                  size="icon"
                  disabled={!!editingCategory}
                  variant="destructive"
                  onClick={() => category.id && handleDelete(category.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {categories.length === 0 && (
        <p className="flex items-center justify-center text-sm text-foreground mt-10">
          Nenhuma categoria cadastrada no momento!
        </p>
      )}
    </>
  );
}
