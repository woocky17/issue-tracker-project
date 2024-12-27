import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Link, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import IssueToolBar from "./IssueToolBar";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const { status, orderBy } = await searchParams;
  const validStatus = statuses.includes(status) ? status : undefined;

  const ValidOrderBy = columns.map((column) => column.value).includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
    orderBy: ValidOrderBy,
  });
  return (
    <div>
      <IssueToolBar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: { status: status || "all", orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderBy && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
