import { createSlice, isFulfilled, isPending, isRejected, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CommonInitialState {
    classSearch: { [key: string]: string },
    userSearch: { [key: string]: string },
    // search: string,
    error: { [key: string]: string },
    loading: { [key: string]: boolean },
    // currentClass: string | null,
    sidebar: boolean,
    pages: {
        [key: string]: {
            pageNum: number,
            totalPages: number
        }
    }
}

const initialState: CommonInitialState = {
    // search: "",
    classSearch: {},
    userSearch: {},
    error: {},
    loading: {},
    // currentClass: null,
    sidebar: true,
    pages: {}
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setClassSearch: (state, action: PayloadAction<{ [key: string]: string }>) => {
            state.classSearch[action.payload.type] = action.payload.value;

        },
        setUserSearch: (state, action: PayloadAction<{ [key: string]: string }>) => {
            state.userSearch[action.payload.type] = action.payload.value;
        },
        // setCurrentClass: (state, action) => {
        //     state.currentClass = action.payload
        // },
        setSidebar: (state) => {
            state.sidebar = !state.sidebar
        },
        // clearPagesValue: (state) => {
        //     state.pages = { pageNum: 0, totalPages: 0 }
        // }
        // getSignUpData: (state, action) => {
        //     state.signupData = action.payload
        // },
        // getLoginData: (state, action) => {
        //     state.loginData = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state, action) => {
                const key = action.type.replace('/pending', '')
                state.loading[key] = true
                delete state.error[key]
                state.pages[key] = { pageNum: 0, totalPages: 0 }
                // console.log("get Response In Matcher :", action.payload);

                //  const key=action.type.s
            })
            .addMatcher(isFulfilled, (state, action) => {
                const key = action.type.replace('/fulfilled', '')
                state.loading[key] = false;
                delete state.error[key]

                state.pages[key] =
                    (action.payload as { pages: { pageNum: number, totalPages: number } })?.pages
                    || { pageNum: 0, totalPages: 0 }

                // console.log("get Response In Matcher :", action.payload);
            })
            .addMatcher(isRejected, (state, action) => {
                const key = action.type.replace('/rejected', '');

                state.loading[key] = false;

                if (typeof action.payload === 'string') {
                    state.error[key] = action.payload
                    toast.error(`${action.payload}`)
                }
                state.pages[key] = { pageNum: 0, totalPages: 0 }
            })
    }
});
export const { setClassSearch, setUserSearch, setSidebar, /*clearPagesValue */ } = commonSlice.actions;
export default commonSlice.reducer

