"use client";

import React, { useEffect, useState } from "react";
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

import { ChevronRight, ScanSearch } from "lucide-react";

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
import Link from "next/link";

import { trpc } from "@/trpc/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import PlanViewer from "@/components/planoverview/PlanViewer";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/allaround/Spinner";

// Import statements remain the same

type PageProps = {};

const directusApiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

const Page: React.FC<PageProps> = () => {
  const [imageBg, setImageBg] = useState<string | undefined>();
  const [details, setDetails] = useState<any[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [planeId, setPlaneId] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const pathname = usePathname();
  const [, uuid] = pathname.split("/plans/");

  const queryClient = useQueryClient();

  const { data } = trpc.getOverviewPlanes.useQuery(
    {
      project: uuid,
    },
    {
      onSuccess(data) {
        console.log("thedata", data);
      },
    }
  );

  type PlanList = any;

  const columns: ColumnDef<PlanList>[] = [
    {
      accessorKey: "projectNumber",
      header: "Project",
      cell: ({ row }) => (
        <div className="capitalize">
          <Link href={`/projekt/${row.getValue("projectNumber")}`}>
            <Button variant="outline" size="sm">
              {row.getValue("projectNumber")}
            </Button>
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "label",
      header: "Label",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("label")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },

    {
      accessorKey: "insertDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            insertDate
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const timestamp = row.getValue("insertDate") as string;
        const date = new Date(timestamp);

        // Get the date in the format 'dd.mm.yyyy' (German) and time in 24-hour format
        const formattedDate = date.toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div className="capitalize">
            {formattedDate}, {formattedTime}
          </div>
        );
      },
    },
    {
      accessorKey: "PlaneStatus",
      header: "Plane Status",
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
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const detail = row.original;

        const imageHref = `${directusApiUrl}assets/${detail.PlaneFile}`;

        const iconClass = "h-6 w-6 p-0 bg-[#47989c]";

        return (
          <div className="flex justify-around gap-2 items-center">
            <Link href={`/plans/${row.original.id}`}>
              <Button variant="ghost" className={iconClass}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" className={iconClass}>
              <HoverCard>
                <HoverCardTrigger>
                  <ScanSearch className="h-5 w-5" />
                </HoverCardTrigger>
                <HoverCardContent className="bg-zinc-500 w-[700px] aspect-video mr-10 relative">
                  {/* {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
                      <Spinner />
                    </div>
                  )}{" "}
                  Display spinner when loading */}
                  <Image
                    src={imageHref}
                    alt="/test"
                    width={10000}
                    height={10000}
                    className={`w-full h-full object-cover -z-10`}
                    // onLoad={() => setLoading(false)}
                    // onError={() => setLoading(false)}
                    // style={{ opacity: loading ? 1 : 1 }}
                  />
                </HoverCardContent>
              </HoverCard>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={iconClass}>
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
  const [filterType, setFilterType] = React.useState<string>("label");

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
                  <DropdownMenuItem onClick={() => setFilterType("label")}>
                    label
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterType("description")}
                  >
                    description
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => setFilterType("User")}>
                    User
                  </DropdownMenuItem> */}
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
          <div className="flex items-center justify-end space-x-2 py-4">
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
          </div>
        </div>
      ) : (
        <>
          {data && data.length === 0 ? (
            <div className="text-center flex h-[100%] items-center justify-center">
              <div className="text-3xl">No Plane Overviews for {uuid}.</div>
            </div>
          ) : (
            <div className="text-center flex h-[100%] items-center justify-center relative">
              <Spinner />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Page;
