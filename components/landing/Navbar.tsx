export default function Navbar(){
    return (
        <nav className="w-full bg-white shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                <h1 className="text-2xl font-bold text-pink-500">
                    Sistema de Gestion de Ventas
                </h1>

                <div className="flex items-center gap-8">
                    <a href="#" className="text-gray-700 hover:text-oink-500">
                        Inicio
                    </a>

                     <a href="#" className="text-gray-700 hover:text-oink-500">
                        Caracteristica
                    </a>

                     <a href="#" className="text-gray-700 hover:text-oink-500">
                        Contacto
                    </a>
                <button className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600">
                    Iniciar sesión
                </button> 

                </div>
            </div>

        </nav>
    );
}