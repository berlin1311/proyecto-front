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
    <div className="bg-white rounded-2xl shadow-md p-6 border p-5 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500 capitalize">
              {titulo}
              </p>

            <h2 className="text-4xl font-bold mt-2 text-800 mt-3">
              {valor}
              </h2>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">
            <Icon size={30} className="text-pink-600" />
        </div>
      </div>
    </div>
  );
}