'use client';
import React, {ReactNode} from "react";
import CopyButton from "@/components/code/copy2clipboard";
import {cn} from "@/lib/utils";

export default function CodeBlock({children, className, copyString}: {
  children: ReactNode,
  className?: string,
  copyString?: string
}) {

  return (
    <div className={cn('relative bg-gray-300 dark:bg-gray-700 rounded-md flex flex-row p-4 w-full justify-between', className)}>
      <pre className={'text-foreground overflow-x-auto content-center'}>
        {children}
      </pre>
      <CopyButton content={copyString || children as string} className={''}/>
    </div>
  );
}