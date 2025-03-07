import Skeleton from "react-loading-skeleton"


const ArtistDetailSkeleton = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center">
      {/* Capa de fondo */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenido Principal */}
      <div className="relative bg-white rounded-lg shadow-lg w-4/5 p-6 z-10">
        <div className="grid grid-cols-1 gap-8 text-center lg:text-left">
          {/* Imagen de perfil y descripción */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-6">
            <Skeleton circle height={160} width={160} className="shadow-lg" />
            <div className="w-full">
              <Skeleton height={30} width="60%" />
              <Skeleton height={16} width="80%" className="mt-3" />
              <Skeleton height={16} width="75%" />
              <Skeleton height={16} width="70%" />

              {/* Redes Sociales */}
              <div className="flex justify-center lg:justify-start gap-4 mt-4">
                <Skeleton circle height={32} width={32} />
                <Skeleton circle height={32} width={32} />
                <Skeleton circle height={32} width={32} />
                <Skeleton circle height={32} width={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Contenedores de Spotify / YouTube */}
        <div className="flex flex-col-reverse lg:flex-row justify-around items-center">
          <div className="flex justify-center lg:w-[45%] w-full items-center mb-6 mt-6 lg:mt-0 lg:mb-0 rounded-lg shadow-lg overflow-hidden">
            <Skeleton height={200} width="100%" />
          </div>
          <div className="flex justify-center lg:w-[45%] w-full">
            <Skeleton height={200} width="100%" />
          </div>
        </div>

        {/* Propuestas */}
        <div className="mt-10">
          <div className="mt-4 space-y-3">
            <Skeleton height={60} width="100%" />
            <Skeleton height={60} width="100%" />
            <Skeleton height={60} width="100%" />
          </div>
        </div>

        {/* Botones */}
        <div className="mt-8 flex gap-4">
          <Skeleton height={40} width={50} borderRadius={8} />
          <Skeleton height={40} width={150} borderRadius={8} />
          <Skeleton height={40} width={120} borderRadius={8} />
        </div>
      </div>
    </div>
  )
}

export default ArtistDetailSkeleton
