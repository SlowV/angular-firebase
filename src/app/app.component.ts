import {Component} from '@angular/core';
import {AuthService} from './core/serivce/auth.service';
import {User} from './core/model/user';
import {LocalStorageUtil} from './core/utils/LocalStorageUtil';
import {RoleEnum} from './core/utils/RoleEnum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sm-ngrx';
  isCollapsed = false;
  user: User;
  userInfo: User;
  isVisible = false;

  constructor(private authService: AuthService) {
    this.user = this.getUserLogin();
    console.log(this.user);
  }

  logout(): void {
    this.authService.signOut().then();
  }

  getUserInfo(): void {
    this.authService.findUserById(this.user.uid).subscribe(value => {
      this.userInfo = value;
      this.showModal();
    });
  }

  getUserLogin(): User {
    return LocalStorageUtil.getData<User>('user');
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getRoleName(role: string): { name: string, class: string } {
    switch (role) {
      case RoleEnum.ADMIN:
        return {name: 'Admin', class: 'admin'};
      case RoleEnum.CUSTOMER:
        return {name: 'Khách hàng', class: 'customer'};
      case RoleEnum.EMPLOYEE:
        return {name: 'Nhân viên', class: 'employee'};
      case RoleEnum.SYSTEM:
        return {name: 'Hệ thống', class: 'system'};
      default:
        return {name: 'Chưa có quyền', class: 'none'};
    }
  }
}
