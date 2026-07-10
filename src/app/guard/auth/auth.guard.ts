import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login/login.service';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(LoginService);
  const router = inject(Router);


  if(auth.isLoggedIn())
  {
    return  true;
  }else{
    router.navigate(["/home"]);
    alert("You cannot access this page ! You must login first!")
    return false;

}
};
