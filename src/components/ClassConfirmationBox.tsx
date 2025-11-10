import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface ClassConformationProps {
    markComplete(): void,
    className: string,
    classTime: string,
    classTrainer: string,
    classId: string,
    status: string
}

export const ClassConformation: React.FC<ClassConformationProps> = ({ markComplete, className, classTime, classTrainer, status }) => {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button className="text-[12px] border-none hover:bg-transparent-bg-gray-700 hover:text-white p-2 bg-gray-700 " disabled={status === 'complete'} variant="outline">Mark Complete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-md text-gray-300">Reconfirm The Class You Want To Mark</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="flex flex-col justify-between px-4  rounded-xl bg-gray-800 border border-gray-600 ">
                            <div className="flex gap-4 justify-between w-full">
                                <span id="subject" className='p-3 text-gray-500'>Class Name</span>
                                <span id="subject" className='p-3'>{className}</span>
                            </div>
                            <div className="flex gap-4 justify-between w-full">
                                <span id="subject" className='p-3 text-gray-500'>Class Time</span>
                                <span id="subject" className='p-3'>{classTime}</span>
                            </div>
                            <div className="flex gap-4 justify-between w-full">
                                <span id="subject" className='p-3 text-gray-500'>Class Trainer</span>
                                <span id="subject" className='p-3'>{classTrainer}</span>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-[12px] p-2">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={markComplete} className="text-[12px] p-2 bg-gray-700 text-white hover:text-white hover:bg-gray-700">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
