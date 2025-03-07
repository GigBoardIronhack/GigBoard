import Skeleton from "react-loading-skeleton"

const FavoriteArtistSkeleton = () => {
  return (
    <div
      className="container flex flex-col w-full shadow-medium p-4 justify-center items-center mb-4
       lg:w-full lg:min-h-[120px] lg:flex-row rounded-small"
    >
      {/* Imagen del artista (skeleton) */}
      <div className="w-full lg:w-1/5 flex justify-center items-center overflow-hidden rounded-lg">
        <Skeleton height={80} width={80} circle />
      </div>

      {/* Nombre y estilos (skeleton) */}
      <div className="text-center flex justify-center items-center flex-col w-full lg:w-3/5">
        <div className="pt-2 w-2/3">
          <Skeleton height={20} width="80%" />
        </div>
        <div className="pb-2">
          <Skeleton height={16} width="60%" />
        </div>
      </div>

      {/* Botones de edición y eliminación (skeleton) */}
      <div className="w-full lg:w-1/5 p-0 flex justify-center lg:justify-end">
        <div className="w-full flex flex-col lg:flex-row justify-around lg:justify-end">
          <Skeleton height={36} width={80} className="rounded-lg" />
          <Skeleton height={36} width={80} className="rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default FavoriteArtistSkeleton
