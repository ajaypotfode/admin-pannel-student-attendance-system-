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

export type AttendenceParams = {
    classId?: string;
    date?: string;
    pageNum?: number;
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

export interface StudentAttendance<T> {
    _id: string;
    studentId: Student;
    classId: Class;
    summary: T;
    __v: number;
}

export interface TotalClassStats {
    totalClass: number;
    attendence: number;
    absence: number;
}


export interface GetAttendenceResponse extends CommonResponse {
    result?: {
        attendendStudents: StudentAttendance<SummaryEntry>[];
        totalAttendence: AttendenceType<string> | null
    }
    pages: { pageNum: number, totalPages: number }
}

export interface GetAttendenceListResponse extends CommonResponse {
    result?: AttendenceType<string>[]
}


export interface GetAttendenceSummaryResponse extends CommonResponse {
    result?: {
        sessions: StudentAttendance<SummaryEntry[]>;
        totalClass: TotalClassStats;
    };
    pages?: {
        totalPages: number;
        pageNum: number;
    };
}

// export type MarkAttendence


export type AllStudentType = {
    _id: string,
    userName: string,
    role: string,
    email: string,
    contactNo: string,
    status: string
}

export type AllStudentsParams = {
    search?: string,
    pageNum?: number,
    classId?: string
}

export interface GetClassStudentsResponse extends CommonResponse {
    result?: AllStudentType[],
    pages?: {
        pageNum: number,
        totalPages: number
    }
}


export interface MarkAttendenceParams {
    classId: string,
    studentIds: string[]
}

export interface MarkAttendenceResponse extends CommonResponse {
    result?: AllStudentType[],
    pages?: {
        pageNum: number,
        totalPages: number
    }
}



export interface AttendenceInitialState {
    attendenceSummary: {
        sessions: StudentAttendance<SummaryEntry[]>;
        totalClass: TotalClassStats;
        // totalPages: number;
        // pageNum: number;
    } | null;
    attendanceData: {
        attendendStudents: StudentAttendance<SummaryEntry>[];
        totalAttendence: AttendenceType<string>|null;
    }
    todaysAttendence: AttendenceType<Class> | null;
    weekAttendence: AttendenceType<string>[];
    attendenceParams: { classId: string, date: string, customeDate?: string }
    summaryParams: { endDate: string, startDate: string };
    // attendanceParams: { classId: string, date: string };
    attendenceHistoryParams: { email: string, classId: string };
    // currentAttendenceClass: null | string;
    allClassStudents: AllStudentType[] | null;
    dataForMarkAttendence: MarkAttendenceParams;
}