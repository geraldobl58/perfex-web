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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Products() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold mb-4">Produtos</h3>
        <Button variant="default">Adicionar produto</Button>
      </div>
      <div className="bg-white rounded-lg p-4">
        <h5 className="text-sm font-bold mb-4">Filtro de pesquisa</h5>
        <div className="grid grid-cols-4 gap-4">
          <Input placeholder="ID" />
          <Input placeholder="Título" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_stocvke">Em estoque</SelectItem>
              <SelectItem value="dark">Fora de estoque</SelectItem>
            </SelectContent>
          </Select>
          <Button>Buscar</Button>
        </div>

        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>#ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="flex justify-end">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>432849fgd7</TableCell>
              <TableCell>Mouse</TableCell>
              <TableCell>Lorem ipsum</TableCell>
              <TableCell>R$20,00</TableCell>
              <TableCell>10</TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <Badge variant="default">Aprovado</Badge>
              </TableCell>
              <TableCell>Informática</TableCell>
              <TableCell className="flex justify-end gap-4">
                <Button size="icon">
                  <Edit2 className="size-4" />
                </Button>
                <Button size="icon" variant="destructive">
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* {categories.length === 0 && (
        <p className="flex items-center justify-center text-sm text-foreground mt-10">
          Nenhuma categoria cadastrada no momento!
        </p>
      )} */}
      </div>
    </>
  );
}
