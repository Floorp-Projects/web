import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

type InfoAlertProps = {
  title: string;
  description: string;
};

export default function InfoAlert({title, description}: InfoAlertProps) {
  return (
    <Alert>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}