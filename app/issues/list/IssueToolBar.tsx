"use client";

import { Spinner } from "@/app/components";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";

const IssueToolBar = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <div className="mb-5">
      <Button disabled={isLoading}>
        <Link href="/issues/new" onClick={() => setLoading(true)}>
          New Issue
        </Link>
        {isLoading && <Spinner />}
      </Button>
    </div>
  );
};

export default IssueToolBar;
