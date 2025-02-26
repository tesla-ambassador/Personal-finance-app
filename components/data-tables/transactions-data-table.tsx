"use client";

// Decided to reconstruct this component so that I get used to making data tables.
import React from "react";

import {
  ColumnDef,
  getCoreRowModel,
  flexRender,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
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
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";

import { Separator } from "../ui/separator";

import { Input } from "../ui/input";

import { SearchIcon } from "../icons/search-icon";
import { SortIconMobile } from "../icons/data-table-icons";
import { FilterIconMobile } from "../icons/data-table-icons";
import { CaretLeftIcon } from "../icons/chevron-icons";
import { CaretRightIcon } from "../icons/chevron-icons";

import { useMediaQuery } from "@/hooks/media-query-hook";

// Sorting and Filtering constants
import { columnSorts } from "./recurring-bills-data-table";
import { hover } from "@testing-library/user-event/dist/cjs/convenience/hover.js";

const filterCategories = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// The data table;
export function TransactionDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const sortIndex = React.useRef<number>(0);
  const filterIndex = React.useRef<number>(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleSortChange = React.useCallback(
    (value: string) => {
      const selectedSort = columnSorts.find((col) => col.name === value);
      if (!selectedSort) return;
      sortIndex.current = columnSorts.findIndex((col) => col.name === value);
      table.getColumn(selectedSort.col)?.toggleSorting(selectedSort.desc);
    },
    [columnSorts, table, sortIndex]
  );

  const isMobile = useMediaQuery("(max-width: 639px)");

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  if (isMobile) {
    return (
      <div>
        <div className="flex justify-between gap-3 pb-8">
          <div className="relative flex items-center w-full max-w-[215px]">
            <Input
              placeholder="Search transaction"
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
          <div className="w-full max-w-8 flex items-center gap-4 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SortIconMobile className="fill-[#201F24] size-5" />
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FilterIconMobile className="fill-[#201F24] size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="sr-only">
                    Filter options
                  </DropdownMenuLabel>
                  {filterCategories.map((category, index) => (
                    <div key={category}>
                      <DropdownMenuItem
                        onClick={() => {
                          filterIndex.current =
                            filterCategories.indexOf(category);
                          category === "All Transactions"
                            ? table
                                .getColumn("category")
                                ?.setFilterValue(undefined)
                            : table
                                .getColumn("category")
                                ?.setFilterValue(category);
                        }}
                        className={`${
                          filterIndex.current === index ? "font-bold" : ""
                        }`}
                      >
                        {category}
                      </DropdownMenuItem>
                      {index !== category.length - 1 && (
                        <DropdownMenuSeparator />
                      )}
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
                <TableRow key={row.id}>
                  <TableCell colSpan={columns.length}>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div>
                          {flexRender(
                            row.getVisibleCells()[0].column.columnDef.cell,
                            row.getVisibleCells()[0].getContext()
                          )}
                        </div>
                        <div>
                          {flexRender(
                            row.getVisibleCells()[1].column.columnDef.cell,
                            row.getVisibleCells()[1].getContext()
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>
                          {flexRender(
                            row.getVisibleCells()[2].column.columnDef.cell,
                            row.getVisibleCells()[2].getContext()
                          )}
                        </div>
                        <div className="text-base">
                          {flexRender(
                            row.getVisibleCells()[3].column.columnDef.cell,
                            row.getVisibleCells()[3].getContext()
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="sm:hidden p-4 flex items-center justify-between gap-2">
          <Button
            variant={"outline"}
            onClick={() => {
              table.previousPage();
            }}
            className="border-[#98908B]"
            disabled={!table.getCanPreviousPage()}
          >
            <CaretLeftIcon className="fill-[#98908B]" />
          </Button>
          <div className="flex w-full max-w-[210px] gap-2 justify-between items-center transition-all duration-200 ease-in-out">
            <Button
              className="size-10"
              variant={currentPage === 0 ? "default" : "outline"}
              style={{ borderColor: currentPage === 0 ? "#201F24" : "#98908B" }}
              onClick={() => {
                table.setPageIndex(0);
              }}
            >
              1
            </Button>
            <Button
              className="size-10"
              variant={currentPage === 1 ? "default" : "outline"}
              style={{ borderColor: currentPage === 0 ? "#201F24" : "#98908B" }}
              onClick={() => {
                table.setPageIndex(1);
              }}
            >
              2
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  className="size-10 border-[#98908B]"
                >
                  ...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="sr-only">
                    Pages
                  </DropdownMenuLabel>
                  {Array.from({ length: totalPages - 3 }, (_, i) => (
                    <div key={i + 3}>
                      <DropdownMenuItem
                        onClick={() => {
                          table.setPageIndex(i + 3 - 1);
                        }}
                        className="text-[#201F24] text-center focus:cursor-pointer focus:text-[#201F24]"
                      >
                        <span className="w-full">{i + 3}</span>
                      </DropdownMenuItem>
                      {i + 3 !== totalPages - 1 && <Separator />}
                    </div>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="size-10"
              variant={currentPage === totalPages - 1 ? "default" : "outline"}
              style={{
                borderColor:
                  currentPage === totalPages - 1 ? "#201F24" : "#98908B",
              }}
              onClick={() => {
                table.setPageIndex(totalPages - 1);
              }}
            >
              {totalPages}
            </Button>
          </div>
          <Button
            variant={"outline"}
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="border-[#98908B]"
          >
            <CaretRightIcon className="fill-[#98908B]" />
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="hidden sm:flex justify-between gap-3 pb-8">
          <div className="relative flex items-center w-full max-w-[10.688rem] lg:max-w-[14rem]">
            <Input
              placeholder="Search transactions"
              className="hidden lg:block border-[#98908B] w-full px-5 py-3 ring-offset-0 focus-visible:border-black focus-visible:ring-offset-0 focus-visible:border-2 focus-visible:ring-0 dark:focus-visible:ring-0"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />
            <Input
              placeholder="Search tran..."
              className="border-[#98908B] lg:hidden w-full px-5 py-3 ring-offset-0 focus-visible:border-black focus-visible:ring-offset-0 focus-visible:border-2 focus-visible:ring-0 dark:focus-visible:ring-0"
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
          <div className="flex gap-3 w-full justify-end">
            <div className="flex items-center gap-2">
              <span className="w-full text-[0.875rem]">Sort By</span>
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
                      <SelectLabel className="sr-only">Sort By</SelectLabel>
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
            <div className="flex items-center gap-2">
              <span className="text-[0.875rem]">Category</span>
              <div className="w-full max-w-48">
                <Select
                  defaultValue={filterCategories[filterIndex.current]}
                  onValueChange={(value) => {
                    filterIndex.current = filterCategories.indexOf(value);
                    value === "All Transactions"
                      ? table.getColumn("category")?.setFilterValue(undefined)
                      : table.getColumn("category")?.setFilterValue(value);
                  }}
                >
                  <SelectTrigger className="border-[#98908B] focus-visible:ring-0 ring-offset-0 focus-visible:border-black focus-visible:border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="p-3">
                      <SelectLabel className="sr-only">
                        Category Filter
                      </SelectLabel>
                      {filterCategories.map((category, index) => (
                        <div key={index}>
                          <SelectItem value={category} className="py-3">
                            {category}
                          </SelectItem>
                          {index !== filterCategories.length - 1 && (
                            <Separator />
                          )}
                        </div>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                    No Results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="hidden p-4 sm:flex items-center justify-between gap-2">
          <Button
            variant={"outline"}
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="border-[#98908B] hover:bg-transparent active:scale-95 transition-all duration-150 ease-in-out"
          >
            <CaretLeftIcon className="fill-[#98908B]" />
            Prev
          </Button>
          <div className="flex w-full max-w-[232px] gap-2 justify-between items-center transition-all duration-200 ease-in-out">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                className="size-10 active:scale-95 transition-all duration-150 ease-in-out"
                variant={currentPage === i ? "default" : "outline"}
                style={{
                  borderColor: currentPage === i ? "#201F24" : "#98908B",
                }}
                onClick={() => {
                  table.setPageIndex(i);
                }}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant={"outline"}
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="border-[#98908B] hover:bg-transparent active:scale-95 transition-all duration-150 ease-in-out"
          >
            Next
            <CaretRightIcon className="fill-[#98908B]" />
          </Button>
        </div>
      </div>
    );
  }
}
