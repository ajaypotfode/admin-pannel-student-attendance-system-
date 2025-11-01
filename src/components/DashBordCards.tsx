import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BookOpen, BookOpenCheck, User2, UserCheck2Icon, type LucideProps } from 'lucide-react'
// import { CheckCircleIcon, School, UserPlus2, Users } from 'lucide-react'

interface CardProps {
    title: string,
    mainValue: number,
    detail: string,
    logo: string,
}


const Icons: React.FC<{ iconName: string }> = ({ iconName }) => {
    const icons: { [key: string]: React.FC<LucideProps> } = {
        activeStudents: UserCheck2Icon,
        students: User2,
        activeClass: BookOpenCheck,
        classes: BookOpen
    }

    const IconComponent = icons[iconName]
    return <IconComponent />
}


const DashBordCards: React.FC<CardProps> = ({ title, mainValue, detail, logo }) => {

    return (
        <Card className=" bg-gray-900 border border-gray-500"    >
            {/* {const icon=images[logo]} */}
            <CardHeader>
                <CardDescription>
                    <div className='flex w-full xl:justify-between xl:space-x-0 space-x-3 text-gray-300 bigsc1:text-xl bigsc3:text-lg xl:text-md tex-sm'>
                        <h1 className='whitespace-nowrap'>{title}</h1>
                        <span className='self-end'>
                            <Icons iconName={logo} />
                        </span>
                    </div>
                </CardDescription>
                <CardTitle className=" tabular-nums @[250px]/card:text-3xl text-white smallsc1:text-4xl xl:text-3xl text-2xl  font-bold">
                    {mainValue}
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start xl:gap-1.5 gap-1  text-gray-500 whitespace-nowrap ">
                {/* <div className="line-clamp-1 flex gap-2 font-medium">
                    Trending up this month 
                </div> */}
                <div className="bigsc1:text-lg bigsc3:text-md xl:text-[12px] text-[10px]">
                    {detail}
                </div>
            </CardFooter>
        </Card>
    )
}

export default DashBordCards