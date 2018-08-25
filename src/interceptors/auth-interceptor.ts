import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { storageService } from "../Service/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: storageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.storage.retrieveToken();
        if (token) {
            const authRequest = req.clone({ headers: req.headers.set('authorization', 'Bearer' + token) });
            return next.handle(authRequest);
        }
        return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};