import { stat } from "fs";

export class ApiResponse<T> {
    constructor(
        public status: string,
        public message: string,
        public data: T | null = null,
    ) { }

    public static success(message: string = 'success', status: string = 'OK', data: any = null): ApiResponse<any> {
        return new ApiResponse(status, message, data);
    }

    public static error(message: string = 'something wrong...', status: string = 'INTERNAL_SERVER_ERROR', data: any = null): ApiResponse<any> {
        return new ApiResponse(status, message, data);
    }
}