import Skeleton from "react-loading-skeleton"


const PurposalsListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 items-center p-4 mt-10 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      <div className="container flex flex-col sm:flex-row justify-center items-center sm:h-50 lg:w-8/12 mb-4 pb-2 shadow-md">
       

        {/* Card Body */}
        <div className="text-center flex justify-center p-4">
          <Skeleton width={200} height={24} />
        </div>

        {/* Card Footer with Social Media */}
        <div className="flex justify-center gap-7 p-4">
          <Skeleton circle width={30} height={30} />
          <Skeleton circle width={30} height={30} />
          <Skeleton circle width={30} height={30} />
        </div>

        {/* Card Footer with Buttons */}
        <div className="flex flex-col sm:flex-row justify-between p-4 gap-2">
          <div className="w-full flex justify-center">
            <Skeleton width={120} height={40} />
          </div>
         
        </div>
        
      </div>
    </div>
  
  )
}

export default PurposalsListSkeleton
