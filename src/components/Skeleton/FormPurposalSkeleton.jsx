
import Skeleton from 'react-loading-skeleton'

const FormPurposalSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 shadow-lg rounded-lg w-full max-w-5xl">
        {/* Artista Info + Calendario */}
        <div className="flex flex-col gap-4">
          {/* Artista */}
          <div className="flex items-center justify-center bg-gray-100 shadow-md rounded-lg overflow-hidden p-4">
            <Skeleton circle width={100} height={100} className="mr-4" />
            <div>
              <Skeleton width={120} height={20} className="mb-2" />
              <Skeleton width={150} height={20} />
            </div>
          </div>

          {/* Calendario */}
          <div className="p-4 bg-gray-100 flex justify-center content-center rounded-lg shadow-md">
            <Skeleton width={220} height={180} />
          </div>
        </div>

        {/* Calculator */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-center">
          <Skeleton width={250} height={200} />
        </div>

        {/* Notas + Botón */}
        <div className="flex flex-col gap-4">
          <Skeleton height={100} className="rounded-lg shadow-md" />
          <Skeleton height={40} className="rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default FormPurposalSkeleton
