import { HttpHeaders, HttpParams } from '@angular/common/http';

export type HttpOptionsType = {
    headers?: HttpHeaders | { [key: string]: string };
    params?: HttpParams | { [key: string]: string | number | boolean };
};
