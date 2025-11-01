
import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

// import { cn } from "@/lib/utils"
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
import type { ClassType } from "@/types/ClassTyps"
import UseCommonData from "@/hooks/useCommonData"
import { Spinner } from "./Spinner"


interface ComboBoxProps {
  classData: ClassType[];
  fetchData({ search }: { search?: string }): void;
  getClassId(value: string, name: string): void;
  loading: { [key: string]: boolean }

  // classId: string
}

export const SelectClass: React.FC<ComboBoxProps> = ({ classData, fetchData, getClassId, loading }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");
  const { classSearch, debouncing, getClassSearchValue } = UseCommonData();



  const debounceFetch = React.useCallback(
    debouncing(fetchData, 500), []
  )

  React.useEffect(() => {
    debounceFetch({ search: classSearch['selectClass'] })

  }, [classSearch, debounceFetch])



  React.useEffect(() => {
    if (value) {
      getClassId(value, 'classId')
    }
  }, [value]);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border border-gray-500 bg-transparent"
        >
          {
            value
              ? classData.find((cls) => cls._id === value)?.className
              : "Select Class..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-gray-900 border border-gray-500 text-white ">
        <Command className="bg-gray-900 border border-gray-500 text-white">
          <CommandInput placeholder="Search framework..." value={classSearch['selectClass']} className="h-9" onValueChange={(value) => getClassSearchValue(value, 'selectClass')} />
          <CommandList className="">
            {
              (loading['getActiveClasses'] || loading['getClassesReference']) ? <Spinner className="w-8 h-8" />
                : (
                  <>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {classData.map((cls) => (
                        < CommandItem
                          key={cls._id}
                          value={cls.className}
                          onSelect={() => {
                            setValue(cls._id)
                            setOpen(false)
                          }}
                          className="text-white"
                        >
                          {`${cls.className}-(${cls.time})`}
                          {/* <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
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
