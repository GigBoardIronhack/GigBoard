import Skeleton from "react-loading-skeleton";


const MyArtistSkeleton = ({ isOwner }) => {
  return (
    <div className="relative group w-64 rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="block relative">
        <div className="overflow-hidden">
          <Skeleton height={256} className="w-full h-64 object-cover" />
        </div>
        <div className="p-4 text-center">
          <Skeleton height={20} width="75%" className="mb-2" />
          <Skeleton height={14} width="60%" />
        </div>
      </div>

      {isOwner && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <Skeleton height={36} width={36} circle />
          <Skeleton height={36} width={36} circle />
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const ArtistGridSkeleton = ({ count = 4, isOwner }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 justify-items-center p-4 mt-10 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      {Array.from({ length: count }).map((_, index) => (
        <ArtistCardSkeleton key={index} isOwner={isOwner} />
      ))}
    </div>
  )
}

export default MyArtistSkeleton
