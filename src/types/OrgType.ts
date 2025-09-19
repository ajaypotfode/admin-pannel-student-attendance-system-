export interface CommonResponse {
    message: string,
    success: boolean,
    error?: string
}

export interface OrgData {
    _id: string,
    orgName: string,
    registrationOpen: boolean,
    registrationExpires: string,
    __v: number
}

export interface RegiStartionDataType {
    registration: boolean | undefined,
    time: string,
    date: string,
}


export interface OrgRegistrationResponse extends CommonResponse {
    result?: OrgData
}

export interface OrgListResponse extends CommonResponse {
    result?: OrgData[]
}


export interface OrgInitialState {
    registrationData: RegiStartionDataType,
    // allOrg:OrgData[]
}