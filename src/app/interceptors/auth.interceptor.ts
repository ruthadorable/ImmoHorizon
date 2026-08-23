import {
 HttpInterceptor,
 HttpRequest,
 HttpHandler
} from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor 
implements HttpInterceptor {


intercept(
 req: HttpRequest<any>,
 next: HttpHandler
){

const token =
localStorage.getItem('token');


if(token){

const clonedRequest =
req.clone({

setHeaders:{
 Authorization:`Bearer ${token}`
}

});


return next.handle(clonedRequest);

}


return next.handle(req);

}

}