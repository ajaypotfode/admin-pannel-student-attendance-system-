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

interface ConformationProps {
    clickConfirm(): void,
    text: string,
    heading?: string,
    enableButton?: boolean,
    buttonText: string
}

export const ConformationDialog: React.FC<ConformationProps> = ({ clickConfirm, text, heading, enableButton, buttonText }) => {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button className="text-[12px] border-none hover:bg-transparent-bg-gray-700  p-2 bg-white text-black hover:bg-gray-400  " disabled={enableButton} variant="outline">{buttonText}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-md text-gray-300">{heading}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {text}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-[12px] p-2">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clickConfirm} className="text-[12px] p-2 bg-gray-700 text-white hover:text-white hover:bg-gray-700">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
