import { permanentRedirect } from "next/navigation";

export default function Page() {
  permanentRedirect('https://raw.githubusercontent.com/Floorp-Projects/Install-Floorp/refs/heads/master/install.sh');
}