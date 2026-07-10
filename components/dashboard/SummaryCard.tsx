import { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  titulo: string;
  valor: string | number;
  icono: LucideIcon;
};

export default function SummaryCard({
  titulo,
  valor,
  icono: Icon,
}: SummaryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border">
        <div className="mb-3">
            <Icon size={32} className="text-pink-500" />
        </div>
        <h3 className="text-sm text-gray-500">
            {titulo}
            </h3>
        <p className="text-2xl font-bold mt-2">
            {valor}
            </p>
    </div>
  );
}