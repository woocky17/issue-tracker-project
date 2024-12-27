import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueTable, { columnNames } from "./IssueTable";
import IssueToolBar from "./IssueToolBar";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}) => {
  const statuses = Object.values(Status);
  const { status, orderBy, page } = await searchParams;
  const validStatus = statuses.includes(status) ? status : undefined;
  const where = { status: validStatus };

  const ValidOrderBy = columnNames.includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const pageToNumber = parseInt(page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: ValidOrderBy,
    skip: (pageToNumber - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  return (
    <Flex direction="column" gap="3">
      <IssueToolBar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={pageToNumber}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
