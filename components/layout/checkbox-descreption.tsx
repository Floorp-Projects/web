"use client"
import {Checkbox} from "@/toolkit/components/ui/checkbox"
import {CheckedState} from "@radix-ui/react-checkbox";
import React from "react";
import {cn} from "@/lib/utils";

type CheckboxWithDescriptionProps = {
  id: string;
  label: string;
  description: string;
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function CheckboxWithDescription(props: CheckboxWithDescriptionProps) {
  const {id, label, description, initialChecked, onChange, className} = props
  const [checked, setChecked] = React.useState(initialChecked || false);
  const _onChange = (state: CheckedState) => {
    setChecked(state as boolean);
    if (onChange) {
      onChange(state as boolean);
    }
  }

  return (
    <div className={cn(
      "items-top flex space-x-2",
      className
    )}>
      <Checkbox id={id} onCheckedChange={(e) => _onChange(e)} checked={checked}/>
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}