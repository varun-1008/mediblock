import { Skeleton } from "./ui/skeleton"

export const UserDetails = ({data, role}) => {
  if(!data) {
    return (
      <Skeleton className="h-64 w-80">

      </Skeleton>
    )
  }
  return (
    <div className="space-y-4 bg-white rounded-lg py-5 px-6 h-max">
        <h1 className='font-medium'>{role === 1 ? "Patient Details" : "Doctor Details"}</h1>
        <div className='flex gap-5 text-sm'>
            <div className='w-max flex flex-col gap-y-1'>
                {Object.entries(data).map(([key]) => (
                    <div key={key} className="text-zinc-500">
                        <p className="capitalize">{key} </p> 
                    </div>
                ))}
            </div>
            <div className='w-max flex flex-col gap-y-1'>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="">
                        <p className="capitalize">{value} </p> 
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
