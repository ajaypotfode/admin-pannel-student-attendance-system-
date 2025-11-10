
export const setClassIdService = (classId: string, variable: string) => {
    const jsonData = localStorage.getItem('classId');
    const classData: { [key: string]: string } = jsonData ? JSON.parse(jsonData) : {};
    classData[variable] = classId;
    localStorage.setItem('classId', JSON.stringify(classData));

}


export const getClassIdService = (variable: string) => {
    const jsonData = localStorage.getItem('classId')
    const classData: { [key: string]: string } = jsonData ? JSON.parse(jsonData) : {}
    return classData[variable]
}


export const setUpdateClassDataService = (classData: { id?: string, className: string, trainer: string, time: string }) => {
    localStorage.setItem('classData', JSON.stringify(classData));
}

export const getUpdateClassDataService = () => {
    const jsonData = localStorage.getItem('classData')
    const classData: { id?: string, className: string, trainer: string, time: string } = jsonData ? JSON.parse(jsonData) : {}
    return classData
}

// export const getClassAttendenceData