import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../serivce/auth.service';
import {LocalStorageUtil} from '../utils/LocalStorageUtil';
import {User} from '../model/user';
import {NzMessageService} from 'ng-zorro-antd/message';
import {RoleEnum} from '../utils/RoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private message: NzMessageService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = LocalStorageUtil.getData<User>('user');
    const path = route.routeConfig.path;
    if (route.url[0].path.endsWith('manager')) {
      switch (true) {
        case path.endsWith('product'):
          if (user.role.includes(RoleEnum.ADMIN) ||
            user.role.includes(RoleEnum.SYSTEM) ||
            user.role.includes(RoleEnum.EMPLOYEE)) {
            return true;
          }
      }
    }
    this.message.create('warning', 'Bạn không có quyền truy cập vào mục này!');
    return false;
  }
}
