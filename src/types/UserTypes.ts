
export type UserParams = {
    search?: string,
    pageNum?: number

}

export type StudentDataParams = { email?: string, studentId?: string }

// export type UserData = {
//     email: string,
//     contactNo: string,
//     status: string
// }


interface CommonResponse {
    message: string,
    success: boolean,
    error?: string
}


export type UserType = {
    _id: string,
    userName: string,
    role: string,
    email: string,
    image: string,
    contactNo: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}


export type ActiveTrainer = {
    _id: string,
    userName: string,
    role: string
}

interface ClassId {
    _id: string;
    className: string;
    time: string;
}

interface ClassEntry {
    classId: ClassId;
    totalClass: number;
    attendence: number;
    absence: number;
    __v?: number;
}

export type Pages = {
    totalPages: number,
    pageNum: number
}


export interface StudentResult extends UserType {
    studentClass?: ClassEntry[];
}

// Trainer-specific result
export interface TrainerResult extends UserType {
    trainerClass?: ClassId[];
}


export interface SingleUser<T> extends CommonResponse {
    result?: T;
}


export interface GetUserListResponse extends CommonResponse {
    result?: UserType[];
    pages?: Pages


}

export interface GetUserResponse extends CommonResponse {
    result: UserType
}



export interface UserInitialState {
    allTrainers: UserType[];
    allStudents: UserType[];
    // pages: Pages | null;
    trainer: TrainerResult | null;
    activeTrainer: UserType[];
    student: StudentResult | null;
    userData: string,
    user: { email: string, role: string, status: string, userName: string } | null,

}
