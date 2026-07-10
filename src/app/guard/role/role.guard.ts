import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable ,} from 'rxjs/internal/Observable';
import { LoginService } from '../../services/auth/login/login.service';
export const HasRoleGuard : CanActivateFn =(
  route,
  state
)=> {

  const auth=inject(LoginService);
  const router=inject(Router);
  const roles = localStorage.getItem('roles') || localStorage.getItem('role');
  const role = roles ? JSON.parse(roles) : null;
  const allowedRoles = route.data['roles'] as string[];
  console.log('Allowed Roles:', allowedRoles);
  console.log('User Role:', role);


  if(allowedRoles.includes(role)){
    return true;
  }else{
    alert("You don't have the required role to access this page.");
    router.navigate(['/home']);
    return false;
  }
  
}