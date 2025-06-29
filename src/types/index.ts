export interface User {
    username?: string,
    email: string,
    password: string,
    id?: string
}

export interface ErrorType {
    status: number;
    data: { message: string }
}

export enum TEMPLATE_TYPE {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
}

export interface SelectOption {
    label: string;
    value: string;
}

export enum QUESTION_TYPE {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
    MULTICHOICE = 'MULTICHOICE',
    NUMERICAL = 'NUMERICAL'
}

export interface Option {
    label: string;
    value: string | number;
}

export type OptionValue = string | number

export interface OutletContext {
    search: string
}