import ClassDetailsTable from '@/components/ClassesDetailesTable'
import DashBordCards from '@/components/DashBordCards'
import { CardsSkeleton } from '@/components/Spinner'
import TrainerDetails from '@/components/TrainerDetailsTable'
import UseClassData from '@/hooks/useClassData'
import UseUserData from '@/hooks/useUserData'
// import { UserPlus2 } from 'lucide-react'
import { useEffect } from 'react'


const Dashbord = () => {
    const { getOrganozationOverview, overviewdata, fetchClass, allClasses, loading } = UseClassData();
    const { fetchAllTrainers, allTrainers } = UseUserData()

    useEffect(() => {
        getOrganozationOverview();
        fetchClass({});
        fetchAllTrainers({})
    }, [])


    return (
        <div className="w-full  overflow-y-auto scrollbar-hidden flex-1 h-full">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">Dashboard</h1>
            <div className="flex space-x-6 items-center smallsc1:p-7 p-5">
                {loading['getOverviewdata'] ? <CardsSkeleton />
                    : (overviewdata.map((item, index) => (
                        <div className='flex-1 gap-2' key={index}>
                            <DashBordCards
                                title={item.title}
                                mainValue={item.count}
                                detail={item.details}
                                logo={'logo'}
                                key={index}
                            />
                        </div>
                    ))
                    )
                }
            </div>
            <div className="flex justify-center space-x-6 gap-5 p-5 py-8">
                <ClassDetailsTable allClass={allClasses} loading={loading} />
                <TrainerDetails allTrainers={allTrainers} loading={loading} />
            </div>
        </div>
    )
}

export default Dashbord