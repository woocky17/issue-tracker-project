"use client";

import { Spinner } from "@/app/components";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <Button disabled={isLoading}>
      <Pencil2Icon />
      <Link onClick={() => setLoading(true)} href={`/issues/edit/${issueId}`}>
        Edit Issue
      </Link>
      {isLoading && <Spinner />}
    </Button>
  );
};

export default EditIssueButton;
