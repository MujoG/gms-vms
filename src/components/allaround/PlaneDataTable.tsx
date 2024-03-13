"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import Link from "next/link";

import { trpc } from "@/trpc/client";

// const data: PlanList[] = [];

// // export type PlanList = {
// //   id: string;
// //   planeLabel: string;
// //   ProjectLabel: string;
// //   PlaneStatus: "pending" | "success" | "failed";
// //   UserEmail: string;
// //   user: string;
// //   date_created: Date;
// // };

export type PlanList = any;

export function PlaneDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { data: planes } = trpc.getPlanes.useQuery();

  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    if (planes && planes.data) {
      setData(planes.data);
    }
  }, [planes]);

  const columns: ColumnDef<PlanList>[] = [
    {
      accessorKey: "PlaneLabel",
      header: "Plane Label",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("PlaneLabel")}</div>
      ),
    },
    {
      accessorKey: "ProjectLabel",
      header: "ProjectLabel",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("ProjectLabel")}</div>
      ),
    },
    {
      accessorKey: "User",
      header: "User",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("User")}</div>
      ),
    },
    {
      accessorKey: "UserEmail",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            UserEmail
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase ">{row.getValue("UserEmail")}</div>
      ),
    },

    {
      accessorKey: "PlaneStatus",
      header: "PlaneStatus",
      cell: ({ row }) => (
        <div className="capitalize">
          <Badge
            className={`${
              row.original.PlaneStatus === "Success"
                ? "bg-green-500"
                : row.original.PlaneStatus === "Pending"
                ? "bg-yellow-500"
                : row.original.PlaneStatus === "Failed"
                ? "bg-red-500"
                : ""
            }`}
          >
            {row.getValue("PlaneStatus")}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "date_created",
      header: "date_created",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("date_created")}</div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const detail = row.original;

        return (
          <div className="flex justify-around">
            <Link href={`/plans/${row.original.id}`}>
              <Button variant="ghost" className="h-8 w-8 p-0 bg-[#47989c]">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 bg-[#47989c]">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(detail.id)}
                >
                  Copy Detail Link
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Open In New Tab</DropdownMenuItem>
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterType, setFilterType] = React.useState<string>("UserEmail");

  const getFilterValue = (columnKey: string): string | undefined => {
    return (table.getColumn(columnKey)?.getFilterValue() as string) ?? "";
  };

  const setFilterValue = (columnKey: string, value: string) => {
    table.getColumn(columnKey)?.setFilterValue(value);
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  console.log("Table object:", table);
  return (
    <>
      {data && data.length > 0 ? (
        <div className="w-full bg-white-100 p-5">
          {/* {data.map((item: any) => (
            <div>{item.id}</div>
          ))} */}
          <div className="flex sm:flex-row flex-col justify-center sm:justify-between py-4 gap-2">
            <Input
              placeholder={`Filter by ${filterType}...`}
              value={getFilterValue(filterType)}
              onChange={(event) =>
                setFilterValue(filterType, event.target.value)
              }
              className="max-w-sm"
            />{" "}
            <div className="flex flex-row gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Filter by {filterType}{" "}
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterType("UserEmail")}>
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterType("ProjectLabel")}
                  >
                    Project
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("User")}>
                    User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value: any) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* down is table  */}
          <div className="rounded-md border">
            <Table>
              {/* ovo ne razumijem */}
              <TableHeader className="bg-zinc-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="bg-zinc-50">
                {table.getRowModel()?.rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className={`hover:bg-white  ${
                        row.original.PlaneStatus === "Success"
                          ? "bg-green-50"
                          : row.original.PlaneStatus === "Pending"
                          ? "bg-yellow-50"
                          : row.original.PlaneStatus === "Failed"
                          ? "bg-red-50"
                          : ""
                      }`}
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="">
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
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* footer part */}
          {/* <div className="flex items-center justify-end space-x-2 py-4">
    <div className="flex-1 text-sm text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  </div> */}
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
