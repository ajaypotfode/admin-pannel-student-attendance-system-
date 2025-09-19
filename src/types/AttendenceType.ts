export type AttendenceParams1 = {
    startDate?: string,
    endDate?: string,
    classId?: string
}

export type AttendenceParams2 = {
    email?: string,
    pageNum?: number,
    classId?: string
}


interface CommonResponse {
    message: string,
    success: boolean,
    error?: unknown
}


type AttendenceType<T> = {
    _id: string,
    classId: T,
    date: string,
    totalStudents: number,
    attendence: number,
    absent: number,
    createdAt: string,
    updatedAt: string,
    __v: number
}


export interface Student {
    _id: string;
    userName: string;
    email: string;
}

export interface Class {
    _id: string;
    className: string;
    time: string;
}

export interface SummaryEntry {
    date: string;    // Format: "YYYY-MM-DD"
    time: string;    // Format: "HH:mm AM/PM"
    present: boolean;
}

export interface Session {
    _id: string;
    studentId: Student;
    classId: Class;
    summary: SummaryEntry[];
    __v: number;
}

export interface TotalClassStats {
    totalClass: number;
    attendence: number;
    absence: number;
}



export interface GetAttendenceResponse extends CommonResponse {
    result?: AttendenceType<Class>
}

export interface GetAttendenceListResponse extends CommonResponse {
    result?: AttendenceType<string>[]
}


export interface GetAttendenceSummaryResponse extends CommonResponse {
    result?: {
        sessions: Session;
        totalClass: TotalClassStats;
    };
    pages?: {
        totalPages: number;
        pageNum: number;
    };
}


export interface AttendenceInitialState {
    attendenceSummary: {
        sessions: Session;
        totalClass: TotalClassStats;
        // totalPages: number;
        // pageNum: number;
    } | null;
    todaysAttendence: AttendenceType<Class> | null;
    weekAttendence: AttendenceType<string>[];
    summaryParams: { endDate: string, startDate: string };
    attendenceHistoryParams: { email: string,classId:string },
    currentAttendenceClass: null | string
}


