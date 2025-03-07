'use client';
import {Button} from "@/components/ui/button";
import {ClipboardCopy, ClipboardCheck} from "lucide-react";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";

type CopyButtonProps = {
  content: string
  className?: string
  rest?: any
}

export default function CopyButton({content, className, ...rest}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content as string)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  const icon = copied ? <ClipboardCheck size={18} className={'text-green-600'}/> : <ClipboardCopy size={18} className={'text-black dark:text-white'}/>
  const border = copied ? 'border-green-500' : 'border-gray-500'
  const classes = `m-3 text-white bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border ${border}`
  return (
    <Button paddingH={'sm'} onClick={copyToClipboard} className={cn(classes, className)}  {...rest}>
      {icon}
    </Button>
  )
}