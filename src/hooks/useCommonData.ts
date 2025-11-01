import { useAppDispatch, useAppSelector } from '@/redux/reduxHook'
import { setClassSearch, setSidebar, setUserSearch } from '@/redux/slice/commonSlice'
// import React, { useCallback } from 'react'

const UseCommonData = () => {
    const { classSearch, userSearch, sidebar, pages } = useAppSelector(state => state.common)
    // const {debouncing,search,}=UseCommonData()
    const dispatch = useAppDispatch()


    const debouncing = <Func extends ({ search, pageNum }: { search?: string, pageNum?: number }) => void>(func: Func, delay: number) => {

        let timer: ReturnType<typeof setTimeout>
        return ({ search, pageNum }: { search?: string, pageNum?: number }) => {
            clearTimeout(timer)

            timer = setTimeout(() => {
                func({ search, pageNum })
            }, delay)
        }
    }


    const getClassSearchValue = (value: string, type: string) => {
        dispatch(setClassSearch({ value, type }))
        // console.log("value is :",value);

    }

    const getUserSearchValue = (value: string, type: string) => {
        dispatch(setUserSearch({ value, type }))
    }

    // const debouncingClass=useCallback(

    // )

    const handleSidebar = () => {
        dispatch(setSidebar())
    }



    return {
        debouncing,
        userSearch,
        classSearch,
        getUserSearchValue,
        getClassSearchValue,
        sidebar,
        handleSidebar,
        pages
    }
}

export default UseCommonData