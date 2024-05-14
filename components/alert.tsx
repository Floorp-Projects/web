"use server";

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import {RiInformationLine, RiErrorWarningLine, RiAlarmWarningLine, RiLightbulbFlashLine} from "@remixicon/react";
import {cn} from "@/lib/utils";

type InfoAlertProps = {
  lang: Locale;
  description: string | React.ReactNode;
  severity?: "info" | "warning" | "error" | "success" | "dyk";
};

export default async function FAlert({lang, description, severity = "info"}: InfoAlertProps) {
  const dict = await getDictionary(lang);

  const getTitle = (severity: "info" | "warning" | "error" | "success" | "dyk") => {
    switch (severity) {
      case "info":
        return dict.components.alerts.info;
      case "warning":
        return dict.components.alerts.warning;
      case "error":
        return dict.components.alerts.error;
      case "success":
        return dict.components.alerts.success;
      case "dyk":
        return dict.components.alerts.dyk;
    }
  }

  const getIcon = (severity: "info" | "warning" | "error" | "success" | "dyk") => {
    switch (severity) {
      case "info":
        return <RiInformationLine className="accent-blue-500 h-5 w-5"/>;
      case "warning":
        return <RiErrorWarningLine className="text-yellow-500 h-5 w-5"/>;
      case "error":
        return <RiAlarmWarningLine className="accent-destructive h-5 w-5"/>;
      case "success":
        return <RiLightbulbFlashLine className="text-green-500 h-5 w-5"/>;
      case "dyk":
        return <RiLightbulbFlashLine className="text-purple-700 h-5 w-5 bg-blue bg-y"/>;
    }
  }

  const getColor = (severity: "info" | "warning" | "error" | "success" | "dyk") => {
    switch (severity) {
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-500 dark:bg-background dark:text-blue-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-500 dark:text-white dark:bg-background dark:text-yellow-500";
      case "error":
        return "bg-red-100 text-red-800 border-red-500 dark:bg-red-500 dark:text-white";
      case "success":
        return "bg-green-100 text-green-800 border-green-500 dark:bg-green-500 dark:text-white";
      case "dyk":
        return "bg-purple-100 text-purple-800 border-purple-500 dark:bg-purple-500 dark:text-white";
    }

  }

  return (
    <Alert className={cn(
      getColor(severity),
      "my-4"
    )}>
      <div className='absolute right-4 top-4'>
        {getIcon(severity)}
      </div>
      <AlertTitle>{getTitle(severity)}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}