
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface SelectInputProps {
    getValue(value: string): void,
    options: { value: string, label: string }[],
    inputValue: string
}

export const SelectInput: React.FC<SelectInputProps> = ({ getValue, options, inputValue }) => {

    return (
        <Select onValueChange={(value) => getValue(value)} value={inputValue} >
            <SelectTrigger className="w-full">

                <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* <SelectLabel>Role</SelectLabel> */}
                    {
                        options && options.map((option, index) => (
                            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                            // <SelectItem value="banana">Trainer</SelectItem>
                            // <SelectItem value="blueberry">Admin</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
