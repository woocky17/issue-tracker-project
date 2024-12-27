"use client";

import { Spinner } from "@/app/components";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueToolBar = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <Flex justify={"between"}>
      <IssueStatusFilter />
      <Button disabled={isLoading}>
        <Link href="/issues/new" onClick={() => setLoading(true)}>
          New Issue
        </Link>
        {isLoading && <Spinner />}
      </Button>
    </Flex>
  );
};

export default IssueToolBar;
