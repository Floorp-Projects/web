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
import {useEffect} from "react";

export type ComboboxItem<T> = {
  value: T
  valueString: string
  label: string
}

export type ComboboxLocale = {
  notSelected: string
  notFound: string
  placeholder: string;
  label: string;
}

type ComboboxProps<T> = {
  items: ComboboxItem<T>[];
  initialValue: T | null;
  locale: ComboboxLocale;
  onChange?: (value: T) => void;
}

function getItem<T>(value: T | null, items: ComboboxItem<T>[]): ComboboxItem<T> | null {
  if (!value) {
    return null
  }

  return items.find((item) => item.value === value) || null
}

export function Combobox<T>({items, initialValue, locale, onChange}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<ComboboxItem<T> | null>(
    getItem(initialValue, items)
  )

  useEffect(() => {
    setSelected(getItem(initialValue, items))
  }, [initialValue])

  const handleSelect = (value: string) => {
    const _selected = items.find((priority) => priority.valueString === value)
    setSelected(_selected || null)
    setOpen(false)
    if (onChange && _selected) {
      onChange(_selected.value)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <p className="text-sm text-muted-foreground ml-4 sm:ml-0">{locale.label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="min-w-48 justify-between"
          >
            {selected ? (
              <>
                {selected.label}
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
                {items.map((item, i) => (
                  <CommandItem
                    key={i}
                    value={item.valueString}
                    onSelect={(value) => handleSelect(value)}
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
