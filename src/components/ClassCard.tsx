import { Card, CardContent } from "./ui/card";

interface ClassCardProps {
    className: string;
    trainer: string;
    classId: string;
    // page: string;
    time: string;
    currentClass: string | null;
    onclick(): void
}

export const ClassCard: React.FC<ClassCardProps> = ({ className, trainer, time, onclick, currentClass, classId }) => {
    return (
        <Card className={`bg-[#111827]  text-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 cursor-pointer ${currentClass === classId ? 'border-3 border-gray-300' : 'border border-[#1F2937]'}`} onClick={onclick}>
            <CardContent className="smallsc1:py-3">
                <div className="flex flex-col gap-2">
                    <div className=" flex ">
                        <p className="smallsc1:text-xl xl:text-lg text-md  font-bold whitespace-nowrap">{className}</p>
                    </div>
                    <div className=" flex space-x-6  px-5 py-2 rounded-lg bg-gray-800 border border-gray-600">
                        <p className="smallsc1:text-sm text-[12px] text-gray-300 whitespace-nowrap">{trainer}</p>
                        <p className="place-content-end smallsc1:text-sm text-[12px]  text-gray-300 whitespace-nowrap">
                            {time}
                        </p>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};