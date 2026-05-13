import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default function Home() {
  return (
    <div>
      <h1>Hola</h1>

      <button variant="destructive"> boton con shandcn</button>
      <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
    </div>
  );
}
