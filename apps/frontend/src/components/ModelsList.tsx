import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { printables } from '../../../backend/data/prints'

interface ModelsListProps {
  status?: "published" | "draft" | "all"
}

const ModelsList = ({ status = "all" }: ModelsListProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const filteredModels =
    status === "all"
      ? printables
      : status === "published"
        ? printables.filter((_, index) => index % 3 !== 0)
        : printables.filter((_, index) => index % 3 === 0)

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const toggleAllRows = () => {
    setSelectedRows((prev) => (prev.length === filteredModels.length ? [] : filteredModels.map((model) => model.id)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            Bulk Actions
          </Button>
          <Input placeholder="Search models..." className="h-8 w-[250px]" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            Filter
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === filteredModels.length && filteredModels.length > 0}
                  onCheckedChange={toggleAllRows}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModels.map((model) => (
              <TableRow key={model.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(model.id)}
                    onCheckedChange={() => toggleRow(model.id)}
                    aria-label={`Select ${model.title}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <img src={model.image || "/placeholder.svg"} alt={model.title} className="object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <Link to={`/admin/models/${model.id}`} className="hover:underline">
                    {model.title}
                  </Link>
                </TableCell>
                <TableCell>{model.category.replace("-", " ")}</TableCell>
                <TableCell>
                  {model.price === 0 ? (
                    <Badge variant="outline" className="text-green-600">
                      Free
                    </Badge>
                  ) : (
                    `$${model.price.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={status === "draft" ? "outline" : "default"}>
                    {status === "draft" ? "Draft" : "Published"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(model.dateAdded).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/printable/${model.id}`} className="flex items-center cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/models/${model.id}`} className="flex items-center cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive flex items-center cursor-pointer">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ModelsList