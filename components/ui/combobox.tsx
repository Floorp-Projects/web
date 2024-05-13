"use client"

import * as React from "react"
import {
  ChevronsUpDown,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type ComboboxItem = {
  value: string
  label: string
}

export type ComboboxLocale = {
  notSelected: string
  notFound: string
  placeholder: string;
  label: string;
}

type ComboboxProps = {
  items: ComboboxItem[];
  selected: ComboboxItem | null;
  locale: ComboboxLocale;
}


export function Combobox({items, selected, locale}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<ComboboxItem | null>(
    selected || null
  )

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">{locale.label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                {selectedStatus.label}
              </>
            ) : (
              <>{locale.notSelected}</>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={locale.placeholder} />
            <CommandList>
              <CommandEmpty>{locale.notFound}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        items.find((priority) => priority.value === value) ||
                        null
                      )
                      setOpen(false)
                    }}
                  >
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
