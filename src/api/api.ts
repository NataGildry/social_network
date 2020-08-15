import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "1361bc53-6a1c-4229-9803-b21cf0bd1289"
    }
});


export enum ResultCodeEnum {
    Success=0,
    Error=1,
    CaptureIsRequired=10
}
// //creation of generic for Response type
// export type ResponseType<D = {}, M = Array<string>, RC = ResultCodeEnum> = {
//     data: D,
//     messages: Array<string>,
//     resultCode: RC
// };
export type ResponsesType<D = {}, RC = ResultCodeEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
};

