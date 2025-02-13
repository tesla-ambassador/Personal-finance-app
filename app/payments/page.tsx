import React from "react";
import { DataTables } from "./data-table";
import { Payment, columns } from "./columns";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      category: "anime",
    },
    {
      id: "728ed53f",
      amount: 150,
      status: "success",
      email: "ezra@example.com",
      category: "show",
    },
    {
      id: "728ed54f",
      amount: 100,
      status: "pending",
      email: "mark@example.com",
      category: "music",
    },
    {
      id: "728ed55f",
      amount: 200,
      status: "failed",
      email: "akankwasa@example.com",
      category: "music",
    },
    {
      id: "728ed56f",
      amount: 600,
      status: "processing",
      email: "kulisblown@example.com",
      category: "show",
    },
    {
      id: "728ed57f",
      amount: 50,
      status: "processing",
      email: "comfort@example.com",
      category: "movie",
    },
    {
      id: "728ed58f",
      amount: 170,
      status: "failed",
      email: "belinda@example.com",
      category: "show",
    },
    {
      id: "728ed59f",
      amount: 16,
      status: "success",
      email: "natangaza@example.com",
      category: "music",
    },
    {
      id: "728ed60f",
      amount: 10,
      status: "success",
      email: "kevin@example.com",
      category: "anime",
    },
    {
      id: "728ed61f",
      amount: 16,
      status: "pending",
      email: "luke@example.com",
      category: "show",
    },
    {
      id: "728ed62f",
      amount: 200,
      status: "pending",
      email: "josh@example.com",
      category: "music",
    },
    {
      id: "728ed63f",
      amount: 600,
      status: "failed",
      email: "aaron@example.com",
      category: "anime",
    },
    {
      id: "728ed64f",
      amount: 123,
      status: "success",
      email: "dwib@example.com",
      category: "movie",
    },
    {
      id: "728ed65f",
      amount: 154,
      status: "processing",
      email: "nassing@example.com",
      category: "show",
    },
  ];
}

export default async function Payments() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTables columns={columns} data={data} />
    </div>
  );
}
