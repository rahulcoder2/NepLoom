"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Homebanner = {
  id: string;
  image: string;
  bannerName: string;
};

export const columns: ColumnDef<Homebanner>[] = [
  {
    header: "S.N",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Images",
    cell: ({ row }) => {
      const { image } = row.original;
      return (
        <div>
          <Image
            src={image}
            alt="Home Banner"
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const homebanner = row.original;
      return (
        <div className="flex items-center space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              // Handle edit action
              console.log("Edit:", homebanner);
            }}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              // Handle delete action
              console.log("Delete:", homebanner);
            }}
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
