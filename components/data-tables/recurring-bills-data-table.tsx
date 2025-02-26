"use client";

import React from "react";

// Importing from tanstack
import {
  ColumnDef,
  getCoreRowModel,
  flexRender,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

// Importing the table component.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Importing the select component for sorting.
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

import { Separator } from "../ui/separator";

// Importing the input component for filtering (Search bar)
import { Input } from "../ui/input";

// Importing Relevant Icons
import { SearchIcon } from "../icons/search-icon";
import { SortIconMobile } from "../icons/data-table-icons";

// Import custom hooks
import { useMediaQuery } from "@/hooks/media-query-hook";

// Defining the data table props
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Sorting strategies
export const columnSorts = [
  { id: 1, name: "Latest", col: "date", desc: true },
  { id: 2, name: "Oldest", col: "date", desc: false },
  { id: 3, name: "A to Z", col: "name", desc: false },
  { id: 4, name: "Z to A", col: "name", desc: true },
  { id: 5, name: "Highest", col: "amount", desc: false },
  { id: 6, name: "Lowest", col: "amount", desc: true },
];

// The data table;
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Defining sorting and filtering states
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  // Defining sorting indexes
  const sortIndex = React.useRef<number>(0);

  // Configuring Data table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  // Custom functions

  // Sorting Function (Select box)
  const handleSortChange = React.useCallback(
    (value: string) => {
      const selectedSort = columnSorts.find((col) => col.name === value);
      if (!selectedSort) return;
      sortIndex.current = columnSorts.findIndex((col) => col.name === value);
      table.getColumn(selectedSort.col)?.toggleSorting(selectedSort.desc);
    },
    [table, sortIndex, columnSorts],
  );

  // Lets be honest, tables don't fit on mobile screens ergo...
  const isMobile = useMediaQuery("(max-width: 639px)");

  if (isMobile) {
    return (
      <div>
        <div className="flex justify-between gap-3 pb-8">
          <div className="relative flex items-center w-full max-w-[320px]">
            <Input
              placeholder="Search Bills"
              className="border-[#98908B] w-full px-5 py-3 ring-offset-0 focus-visible:border-black focus-visible:ring-offset-0 focus-visible:border-2 focus-visible:ring-0 dark:focus-visible:ring-0"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />
            <div className="absolute right-5">
              <SearchIcon className="size-5 stroke-[0.5] opacity-50 stroke-[#98908B]" />
            </div>
          </div>
          <div className="w-full max-w-8 flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SortIconMobile className="fill-[#201F24]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="sr-only">
                    Sort options
                  </DropdownMenuLabel>
                  {columnSorts.map((columnSort) => (
                    <div key={columnSort.id}>
                      <DropdownMenuItem
                        onClick={() => {
                          handleSortChange(columnSort.name);
                        }}
                        className={`${
                          sortIndex.current === columnSort.id - 1
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {columnSort.name}
                      </DropdownMenuItem>
                      {columnSorts.indexOf(columnSort) !==
                        columnSorts.length - 1 && <DropdownMenuSeparator />}
                    </div>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Table>
          <TableHeader className="sr-only">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell colSpan={columns.length}>
                    <div className="space-y-2">
                      <div>
                        {flexRender(
                          row.getVisibleCells()[0].column.columnDef.cell,
                          row.getVisibleCells()[0].getContext(),
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          {flexRender(
                            row.getVisibleCells()[1].column.columnDef.cell,
                            row.getVisibleCells()[1].getContext(),
                          )}
                        </div>
                        <div className="text-base">
                          {flexRender(
                            row.getVisibleCells()[2].column.columnDef.cell,
                            row.getVisibleCells()[2].getContext(),
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <div className="hidden sm:flex justify-between gap-3 pb-8">
        <div className="relative flex items-center w-full max-w-[320px]">
          <Input
            placeholder="Search Bills"
            className="border-[#98908B] w-full px-5 py-3 ring-offset-0 focus-visible:border-black focus-visible:ring-offset-0 focus-visible:border-2 focus-visible:ring-0 dark:focus-visible:ring-0"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
          <div className="absolute right-5">
            <SearchIcon className="size-5 stroke-[0.5] opacity-50 stroke-[#98908B]" />
          </div>
        </div>
        <div className="w-full max-w-40">
          <Select
            defaultValue={columnSorts[sortIndex.current].name}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="border-[#98908B] focus-visible:ring-0 ring-offset-0 focus-visible:border-black focus-visible:border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="p-3">
                <SelectLabel className="sr-only">Category</SelectLabel>
                {columnSorts.map((columnSort) => (
                  <div key={columnSort.id}>
                    <SelectItem value={columnSort.name} className="py-3">
                      {columnSort.name}
                    </SelectItem>
                    {columnSorts?.indexOf(columnSort) !==
                      columnSorts.length - 1 && <Separator />}
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
