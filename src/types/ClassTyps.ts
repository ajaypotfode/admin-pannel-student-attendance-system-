export type ClassDataType = {
    className: string,
    trainer: string,
    time: string
}

export type ClassParams = {
    search?: string,
    pageNum?: number,
    classId?: string
}

export type ClassType = {
    className: string,
    trainer: { _id: string, userName: string },
    time: string,
    totalStudents: number,
    status: string,
    _id: string,
    _v: number,
    createdAt: string,
    updatedAt: string
}

export type Overviewdata = [
    {
        count: number,
        title: string,
        details: string,
        logoData: string
    }
]

interface CommonResponse {
    message: string,
    success: boolean,
    error?: unknown
}


export interface GetClassListResponse extends CommonResponse {
    result?: ClassType[],
    pages?: {
        pageNum: number,
        totalPages: number
    }
}

export interface GetClassResponse extends CommonResponse {
    result?: ClassType
}

export interface GetOverviewResponse extends CommonResponse {
    result?: Overviewdata
}


// this is use To Declare Type Of Assign Class

export type AvailableUserType = {
    _id: string,
    userName: string,
    role: string,
    email: string,
    contactNo: string,
    status: string
}


export interface ClassAssignmentDataType {
    classId: string,
    studentsId: string[]
}

export interface GetSAssignClassResponse extends CommonResponse {
    result?: AvailableUserType[],
    pages?: {
        pageNum: number,
        totalPages: number
    }
}



export interface ClassInitialState {
    allClasses: ClassType[];
    activeClasses: ClassType[];
    classData: ClassDataType;
    overviewdata: Overviewdata | [];
    classAssignmentData: ClassAssignmentDataType,
    availableStudents: AvailableUserType[]
}







// export type ClassAttendenceType = {
//     classId: string,
//     date: string,
//     totalStudents: number,
//     attendence: number,
//     absent: number,
//     _id: string,
//     _v: number,
//     createdAt: string,
//     updatedAt: string
// }

// export interface GetClassAttendenceResponse extends CommonResponse {
//     result?: ClassAttendenceType
// }

// export interface GetClassAttendenceListResponse extends CommonResponse {
//     result?: ClassAttendenceType[]
// }