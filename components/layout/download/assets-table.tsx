import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/toolkit/components/ui/table"
import {AssetInfo} from "@/lib/gh-utils";
import {RiDownload2Fill} from "@remixicon/react";
import Link from "next/link";


export type AssetsTableLocale = {
  architecture: string;
  fileName: string;
  fileSize: string;
}

type AssetsTableProps = {
  items: AssetInfo[];
  locale: AssetsTableLocale;
}

export function AssetsTable({items, locale}: AssetsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{locale.architecture}</TableHead>
          <TableHead className={'hidden sm:table-cell'}>{locale.fileName}</TableHead>
          <TableHead>{locale.fileSize}</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item,i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className={'hidden sm:table-cell'}>{item.fileName}</TableCell>
            <TableCell>{item.fileSize}</TableCell>
            <TableCell className="text-right">
              <Link href={item.url}>
                <RiDownload2Fill className="h-5 w-5"/>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}