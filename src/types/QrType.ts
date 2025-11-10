export interface CommonResponse {
    message: string,
    success: boolean,
    error?: unknown
}


export interface StudentId {
    _id: string;
    role: 'student' | string;
    email: string;
    contactNo: string;
    username: string;
}

export interface ClassId {
    _id: string;
    className: string;
    time: string;
}

export interface Students {
    _id: string;
    studentId: StudentId;
    classId: ClassId;
    totalClass: number;
    attendence: number;
    absence: number;
    __v?: number;
}

export interface Attendence {
    _id: string;
    date: string;
    totalStudents: number;
    attendence: number;
    absent: number;
}

export interface QrVerifyResponse extends CommonResponse {
    students: Students;
    attendence: Attendence;
}

export interface CloseClassResponse extends CommonResponse {
    result?: { time: string, className: string, _id: string }
}



// export type QrData = {
//     _id: string,
//     studentId: string,
//     classId: string,
//     totalClass: number,
//     attendence: number,
//     absence: number,
//     __v: number
// }


// export interface QrVerifyResponse extends CommonResponse {
//     result?: QrData,
//     qrtoken?: string
// }


// const 

export interface QrInitialState {
    studentData: Students | null;
    attendence: Attendence | null;
    currentQrClass: string;
    // currentClass: string | null
}