/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { toast } from "sonner";

import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  PlusCircle,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ProductsStatus,
  ProductStatus,
} from "@/components/products/products-status";

import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/services/products";

import {
  ProductFilterSchema,
  productFilterSchema,
  ProductFormSchema,
  productFormSchema,
} from "@/schemas/products";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useCategories } from "@/hooks/useCategories";

import { Product } from "@/types/products";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { categories } = useCategories();

  const pages = z.coerce.number().parse(searchParams.get("page") ?? 1);

  const title = searchParams.get("title");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } =
    useForm<ProductFilterSchema>({
      resolver: zodResolver(productFilterSchema),
      defaultValues: {
        title: title ?? "",
        status: status ?? "",
      },
    });

  const fetchProducts = async () => {
    const data = await getProducts({
      page: pages,
      limit: 10,
      title: title ?? undefined,
      status: status ?? undefined,
    });
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [pages, title, status]);

  const pageChange = async (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 1,
      stock: 1,
      status: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        title: editingProduct.title,
        description: editingProduct.description,
        categoryId: editingProduct.categoryId,
        status: editingProduct.status,
        price: editingProduct.price,
        stock: editingProduct.stock,
      });
    }
  }, [editingProduct, form]);

  useEffect(() => {
    if (!editingProduct) {
      form.reset({
        title: "",
        description: "",
        categoryId: "",
        status: "",
        price: 0,
        stock: 0,
      });
    }
  }, [editingProduct, form]);

  const handleFilter = ({ title, status }: ProductFilterSchema) => {
    setSearchParams((state) => {
      if (title) {
        state.set("title", title);
      } else {
        state.delete("title");
      }

      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");

      return state;
    });
  };

  const handleClearFilter = () => {
    setSearchParams((state) => {
      state.delete("title");
      state.delete("status");
      state.set("page", "1");
      return state;
    });

    reset({
      title: "",
      status: "",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast("Produto deletado com sucesso!");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast("Houve um erro ao deletar o produto!");
    }
  };

  const onSubmit = async (data: ProductFormSchema) => {
    try {
      if (editingProduct) {
        if (editingProduct?.id) {
          const category = categories.find(
            (category) => category.id === data.categoryId
          );
          if (!category) {
            toast("Categoria não encontrada!");
            return;
          }
          const productData = {
            ...data,
            category: {
              ...category,
              id: category.id ?? "",
            },
            status: data.status as ProductStatus,
          };
          await updateProduct(editingProduct.id, productData);
        }
        toast("Produto atualizado com sucesso!");
        fetchProducts();
      } else {
        const category = categories.find(
          (category) => category.id === data.categoryId
        );
        if (!category) {
          toast("Categoria não encontrada!");
          return;
        }
        const productData = {
          ...data,
          category: {
            ...category,
            id: category.id ?? "",
          },
          status: data.status as ProductStatus,
        };
        await addProduct(productData);
        toast("Produto adicionado com sucesso!");
        fetchProducts();
        form.reset();
      }
      setEditingProduct(null);
    } catch (error) {
      console.log(error);
      toast("Houve um erro ao salvar o produto!");
    }
  };

  const handleEdit = (id: string) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setEditingProduct(product);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Gerenciamento de produtos</h3>
        <div className="bg-white rounded-lg p-4 mt-2">
          <p className="text-sm mb-4">Filtro de pesquisa</p>
          <form
            onSubmit={handleSubmit(handleFilter)}
            className="flex items-center justify-center gap-4"
          >
            <Input placeholder="Título" {...register("title")} />

            <FormField
              name="status"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => (
                <Select
                  defaultValue=""
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_stock">Em estoque</SelectItem>
                    <SelectItem value="out_stock">Fora de estoque</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Button type="submit" className="w-[100px] text-xs">
              <Search className="size-4" /> Buscar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleClearFilter()}
              className="w-[100px] text-xs"
            >
              <X className="size-4" /> Remover
            </Button>
          </form>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o título da produto"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Digite a descrição do produto"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field: { name, onChange, value, disabled } }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        defaultValue=""
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <div key={category.id}>
                              <SelectItem value={category.id ?? ""}>
                                {category.title}
                              </SelectItem>
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field: { name, onChange, value, disabled } }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        defaultValue=""
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_stock">Em estoque</SelectItem>
                          <SelectItem value="out_stock">
                            Fora do estoque
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Digite o valor do produto"
                          className="w-full"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estoque</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Digite o estoque do produto"
                          className="w-full"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button variant="default" size="sm">
                    {editingProduct ? (
                      <>
                        <Edit2 className="size-4" />
                        Atualizar
                      </>
                    ) : (
                      <>
                        <PlusCircle className="size-4" />
                        Adicionar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="flex justify-end">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <ProductsStatus status={product.status} />
                  </TableCell>
                  <TableCell>{product.category.title}</TableCell>
                  <TableCell className="flex justify-end gap-4">
                    <Button
                      size="icon"
                      onClick={() => product.id && handleEdit(product.id)}
                    >
                      <Edit2 className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => product.id && handleDelete(product.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-foreground">
          Exibindo {products.length} de {products.length} produtos.
        </p>
        <div className="flex gap-2">
          <Button
            size="icon"
            disabled={pages === 1}
            onClick={() => pageChange(1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button size="icon" onClick={() => pageChange(pages + 1)}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      {products.length === 0 && (
        <p className="flex items-center justify-center text-sm text-foreground mt-10">
          Nenhum produto encontrado.
        </p>
      )}
    </>
  );
}
