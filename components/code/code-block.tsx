'use client';
import React, {ReactNode} from "react";
import CopyButton from "@/components/code/copy2clipboard";
import {cn} from "@/lib/utils";

export default function CodeBlock({children, className, copyString, preClassName}: {
  children: ReactNode,
  className?: string,
  preClassName?: string,
  copyString?: string
}) {

  return (
    <div
      className={cn(
        'relative bg-gray-300 grid grid-cols-6 gap-x-2 w-full dark:bg-gray-700 rounded-md p-4 justify-between',
        className
      )}
    >
      <pre className={cn('text-foreground col-span-5 whitespace-pre-wrap w-full content-center overflow-x-auto', preClassName)}>
        {children}
      </pre>
      <CopyButton content={copyString || children as string} className={'m-0 self-center'}/>
    </div>
  );
}