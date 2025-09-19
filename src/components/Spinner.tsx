import { cn } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
// Custome Spinner Using Shadcn

const Spinner = ({ className }: { className?: string }) => {
    return (
        <div className='w-full h-fit py-6 flex justify-center'>
            <div className={cn("relative w-12 h-12", className)}>
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute left-1/2 top-1/2 w-[2px] h-[20%] bg-white origin-bottom animate-caret-blink"
                        style={{
                            transform: `rotate(${i * 30}deg) translateY(-150%)`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}


const CardsSkeleton = () => {
    return (
        <div className="flex items-center space-x-4">
            {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
            <div className="space-x-4 flex ">
                <Skeleton className="h-6 w-[150px] bg-gray-500 " />
                <Skeleton className="h-6 w-[150px] bg-gray-500 " />
                <Skeleton className="h-6 w-[150px] bg-gray-500 " />
            </div>
        </div>
    )
}


const TableSkeleton = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead><Skeleton className="h-4 bg-gray-500 " /></TableHead>
                    <TableHead><Skeleton className="h-4 bg-gray-500 " /></TableHead>
                    <TableHead><Skeleton className="h-4 bg-gray-500 " /></TableHead>
                    {/* <TableHead><Skeleton className="h-4 w-28" /></TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 bg-gray-500" /></TableCell>
                        <TableCell><Skeleton className="h-4 bg-gray-500" /></TableCell>
                        <TableCell><Skeleton className="h-4 bg-gray-500" /></TableCell>
                        {/* <TableCell><Skeleton className="h-4 w-28" /></TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}



const ProfileCardSkeleton = () => {
    return (
        <div className="flex items-center justify-start  space-x-4">
            <Skeleton className="h-28 w-28 rounded-full bg-gray-500" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-500" />
                <Skeleton className="h-4 w-[200px] bg-gray-500" />
                <Skeleton className="h-4 w-[250px] bg-gray-500" />
                <Skeleton className="h-4 w-[200px] bg-gray-500" />
            </div>
        </div>
    )
}


const ProfileCardSkeleton2 = () => {
    return (
        <div className="flex flex-col items-center  justify-start space-y-4 w-full ">
            <Skeleton className="h-36 w-36 rounded-full" />
            <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-full bg-gray-500" />
                <Skeleton className="h-4 w-full bg-gray-500" />
                <Skeleton className="h-4 w-full bg-gray-500" />
                <Skeleton className="h-4 w-full bg-gray-500" />
            </div>
        </div>
    )
}


export default function NotificationSkeleton() {
  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col gap-3"> */}
        {/* Date & Time */}
        {/* <div className="flex items-center gap-2"> */}
          <Skeleton className="h-6 w-32 rounded-md bg-gray-500" />
            {/* <div className="relative rounded-2xl border bg-card p-4 shadow"> */}
              {/* Title */}
              <Skeleton className="h-24 w-[60%] mb-2 rounded-2xl bg-gray-500" />

              {/* Subtitle */}
              {/* <Skeleton className="h-4 w-64 mb-2 rounded" /> */}
            </div>
        //   </div>
    //     </div>
    //   </div>
    // </div>
  );
}



export { Spinner, CardsSkeleton, TableSkeleton, ProfileCardSkeleton, ProfileCardSkeleton2 }