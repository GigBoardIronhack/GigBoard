import Skeleton from "react-loading-skeleton"


const PurposalsListSkeleton = () => {
  return (
   

    <div className="relative w-64 group  rounded-lg overflow-hidden shadow-lg border-2 border-gray-300 bg-white ">
      
      {/* Imagen de carga */}
      <div className="overflow-hidden">
        <Skeleton height={256} width="100%" />
      </div>

      {/* Contenido */}
      <div className="p-4 text-center">
        <Skeleton height={20} width="80%" className="mb-2" />
        <Skeleton height={14} width="60%" className="mb-2" />
        <Skeleton height={16} width="50%" className="mb-2" />
      </div>

      {/* Acciones de usuario (si es dueño) */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <Skeleton circle height={32} width={32} />
        <Skeleton circle height={32} width={32} />
      </div>
    </div>
  
  )
}

export default PurposalsListSkeleton
