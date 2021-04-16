import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/serivce/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../core/model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  validateForm!: FormGroup;
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    {label: 'Quản trị', value: 'ADMIN', checked: false},
    {label: 'Nhân viên kinh doanh', value: 'EMP_SALE', checked: false},
    {label: 'Khách hàng', value: 'CUSTOMER', checked: true},
    {label: 'Hệ thống', value: 'SYSTEM', checked: false},
  ];
  user: User = new User();

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null],
      phoneNumberPrefix: ['+84'],
      phoneNumber: [null, [Validators.required]],
    });
    this.user = new User();
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
    console.log(this.checkOptionsOne);
  }

  register(password: string): void {
    this.checkOptionsOne.map(v => {
      if (v.checked) {
        this.user.role.push(v.value);
      }
    });
    this.authService.signUp(this.user, password).then(() => {
    });
  }
}
