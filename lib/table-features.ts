import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  rowPaginationFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
} from "@tanstack/react-table";

// TanStack Table v9 only bundles the features a table opts into.

// Filtering and sorting, showing every row
// (column visibility provides row.getVisibleCells()).
const filterSortFeatures = {
  columnFilteringFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns,
  sortFns,
};

export const listTableFeatures = tableFeatures(filterSortFeatures);
export type ListTableFeatures = typeof listTableFeatures;

// Filtering and sorting, plus pagination.
export const paginatedTableFeatures = tableFeatures({
  ...filterSortFeatures,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});
export type PaginatedTableFeatures = typeof paginatedTableFeatures;
