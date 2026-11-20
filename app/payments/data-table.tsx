"use client";

import React, { useState, useCallback, useEffect } from "react";

import {
  useTable,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  type RowData,
} from "@tanstack/react-table";
import { paginatedTableFeatures, type PaginatedTableFeatures } from "@/lib/table-features";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<PaginatedTableFeatures, TData>[];
  data: TData[];
}

const columnSorts = [
  {
    id: 1,
    name: "Highest",
    col: "amount",
    desc: true,
  },
  {
    id: 2,
    name: "Lowest",
    col: "amount",
    desc: false,
  },
  {
    id: 3,
    name: "A to Z",
    col: "email",
    desc: false,
  },
  {
    id: 4,
    name: "Z to A",
    col: "email",
    desc: true,
  },
];

const categoryFilters = ["all", "anime", "show", "movie", "music"];

export function DataTables<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "amount",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useTable({
    features: paginatedTableFeatures,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });
  // The selected sort and category are derived from the table state.
  const sortIndex = Math.max(
    0,
    columnSorts.findIndex(
      (s) => s.col === sorting[0]?.id && s.desc === sorting[0]?.desc
    )
  );
  const categoryFilter = columnFilters.find((f) => f.id === "category")
    ?.value as string | undefined;
  const filterIndex = categoryFilter
    ? categoryFilters.indexOf(categoryFilter)
    : 0;

  const handleSortChange = useCallback(
    (value: string) => {
      const selectedSort = columnSorts.find((col) => col.name === value);
      if (!selectedSort) return;

      table.getColumn(selectedSort.col)?.toggleSorting(selectedSort.desc);
    },
    [table]
  );

  const handleCategoryFilter = useCallback(
    (value: string) => {
      value === "all"
        ? table.getColumn("category")?.setFilterValue(undefined)
        : table.getColumn("category")?.setFilterValue(value);
    },
    [table]
  );

  const currentPage = table.state.pagination.pageIndex;
  const totalPages = table.getPageCount();

  return (
    <div>
      <div>
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("email")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-[#696868]">Sort By</span>
        <div className="w-[110px]">
          <Select
            value={columnSorts[sortIndex].name}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full border-[#98908B]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="sr-only">Category</SelectLabel>
                {columnSorts.map((columnSort) => (
                  <SelectItem key={columnSort.id} value={columnSort.name}>
                    {columnSort.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=" mt-3 flex gap-3 items-center">
        <span className="text-[#696868]">Sort By</span>
        <div className="w-[110px]">
          <Select
            value={categoryFilters[filterIndex]}
            onValueChange={handleCategoryFilter}
          >
            <SelectTrigger className="w-full border-[#98908B]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="sr-only">Category</SelectLabel>
                {categoryFilters.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
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
                          header.getContext()
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-8 items-center">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => table.setPageIndex(i)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
