import Home from "../NavBar";
// Importa tus componentes de gráficos o cualquier otro contenido que irá dentro de los cuadros

export default function Metrics() {
    return (
        <div className="flex h-screen bg-background text-foreground">
            <Home />
            <div className="flex-1 p-10">
                <h1 className="text-4xl font-bold mb-8">Performance metrics</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cuadro 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Minutes on call per agent</h2>
                        {/* Aquí iría tu componente de gráfico o contenido */}
                    </div>
                    {/* Cuadro 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Agent Average Performance</h2>
                        {/* Aquí iría tu componente de gráfico o contenido */}
                    </div>
                    {/* Cuadro 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Call Type</h2>
                        {/* Aquí iría tu componente de gráfico o contenido */}
                    </div>
                    {/* Cuadro 4 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Today Calls</h2>
                        {/* Aquí iría tu componente de gráfico o contenido */}
                    </div>
                </div>
            </div>
        </div>
    );
}
