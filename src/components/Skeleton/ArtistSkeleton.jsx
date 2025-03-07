import Skeleton from "react-loading-skeleton"

const ArtistSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
   
    <section className="mb-6">
      <Skeleton height={24} width="50%" className="mb-2" />
      <Skeleton height={40} className="w-full rounded-lg" />
    </section>

    
    <section className="mb-6">
      <Skeleton height={24} width="40%" className="mb-2" />
      <Skeleton height={40} className="w-full rounded-lg" />
    </section>

   
    <section className="artist-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800"
        >
          <Skeleton height={180} className="w-full rounded-lg mb-4" />
          <Skeleton height={20} width="60%" className="mb-2" />
          <Skeleton height={16} width="80%" />
        </div>
      ))}
    </section>
  </div>
  )
}

export default ArtistSkeleton
