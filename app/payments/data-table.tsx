"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

import {
  ColumnDef,
  getCoreRowModel,
  flexRender,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
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

export function DataTables<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "amount",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const sortIndex = useRef<number>(0);
  const filterIndex = useRef<number>(0);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });
  const handleSortChange = useCallback(
    (value: string) => {
      const selectedSort = columnSorts.find((col) => col.name === value);
      if (!selectedSort) return;

      sortIndex.current = columnSorts.findIndex((col) => col.name === value);
      table.getColumn(selectedSort.col)?.toggleSorting(selectedSort.desc);
    },
    [columnSorts, sortIndex, table]
  );

  const handleCategoryFilter = useCallback(
    (value: string) => {
      filterIndex.current = categoryFilters.indexOf(value);
      value === "all"
        ? table.getColumn("category")?.setFilterValue(undefined)
        : table.getColumn("category")?.setFilterValue(value);
    },
    [categoryFilters, table, filterIndex]
  );

  const currentPage = table.getState().pagination.pageIndex;
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
            defaultValue={columnSorts[sortIndex.current].name}
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
            defaultValue={categoryFilters[sortIndex.current]}
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
                  data-state={row.getIsSelected() && "selected"}
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
