'use client';
import React, {ReactNode} from "react";
import CopyButton from "@/components/code/copy2clipboard";

export default function CodeBlock({children, copyString}: { children: ReactNode, copyString?: string }) {

  return (
    <div className={'relative'}>
      <CopyButton content={copyString || children as string} className={'absolute top-0 right-0'}/>
      <pre className={'bg-gray-300 text-black p-4 pt-8 rounded-md overflow-x-auto'}>
        {children}
      </pre>
    </div>
  );
}