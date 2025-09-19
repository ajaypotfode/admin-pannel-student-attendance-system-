
import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "./ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"
import type { UserType } from "@/types/UserTypes"
import UseCommonData from "@/hooks/useCommonData"
import { Spinner } from "./Spinner"



interface SelectTrainerProps {
    trainers: UserType[];
    fetchData(): void,
    getTrainer(value: string): void,
    trainerId: string,
    loading: { [key: string]: boolean }
}

export const SelectTrainer: React.FC<SelectTrainerProps> = ({ trainers, fetchData, getTrainer, trainerId, loading }) => {

    const [open, setOpen] = React.useState(false)
    const { classSearch, debouncing, getClassSearchValue } = UseCommonData();



    const debounceFetch = React.useCallback(
        debouncing(fetchData, 500), []
    )

    React.useEffect(() => {
        debounceFetch({search:classSearch})

    }, [classSearch, debounceFetch])


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between border border-gray-500 bg-transparent"
                >
                    {trainerId
                        ? trainers.find((t) => t._id === trainerId)?.userName
                        : "Select Trainer Name..."}

                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-gray-900 border border-gray-500 text-white ">
                <Command className="bg-gray-900 border border-gray-500 text-white">
                    <CommandInput placeholder="Search framework..." value={classSearch} className="h-9" onValueChange={(value) => getClassSearchValue(value)} />
                    <CommandList className="">
                        {
                            (loading['getActiveTrainers']) ? <Spinner className="w-8 h-8" />
                                : (
                                    <>
                                        <CommandEmpty>No Trainer found.</CommandEmpty>
                                        <CommandGroup>
                                            {trainers.map((trainer) => (
                                                < CommandItem
                                                    key={trainer._id}
                                                    value={trainer._id} // store ID in RHF
                                                    onSelect={(selectedId) => {
                                                        getTrainer(selectedId); // updates RHF field
                                                        setOpen(false);
                                                    }}
                                                    className="text-white"
                                                >
                                                    {trainer.userName}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </>
                                )
                        }
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover >
    )
}




