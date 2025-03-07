
import Skeleton from "react-loading-skeleton"; // Importa la librería
import "react-loading-skeleton/dist/skeleton.css"; // Asegúrate de importar los estilos

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-[50px_1/2fr_1fr_1fr] lg:grid-rows-[auto_1fr_1fr_1fr] lg:grid-cols-5 gap-2 lg:gap-4 w-full h-full mx-auto p-4">
      {/* Título del Dashboard */}
      <div className="col-span-1 lg:col-span-5 text-center border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800">
        <Skeleton height={24} width="75%" className="mx-auto" />
      </div>

      {/* Información del usuario (perfil y detalles) */}
      <div className="flex flex-col items-center gap-2 border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-start-3 lg:col-span-1 lg:row-span-2 lg:row-start-2">
        <Skeleton circle height={96} width={96} className="mb-4" />
        <Skeleton height={16} width="75%" className="mb-2" />
        <Skeleton height={16} width="66%" className="mb-2" />
        <Skeleton height={16} width="66%" />
      </div>

      {/* Cards o espacios principales */}
      <div className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-span-2 lg:row-span-2">
        <Skeleton height={192} className="w-full" />
      </div>

      <div className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 py-2 bg-white dark:bg-gray-800 lg:col-span-2 lg:row-span-2">
        <Skeleton height={192} className="w-full" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
