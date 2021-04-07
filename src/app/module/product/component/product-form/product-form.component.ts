import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../core/model/product';
import {ProductService} from '../../../../core/serivce/product.service';
import firebase from 'firebase/app';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Product = new Product();
  submitted = false;
  images: string[] = [];

  constructor(
    private productService: ProductService,
    private message: NzMessageService) {
  }

  ngOnInit(): void {
  }

  newCustomer(): void {
    this.submitted = false;
    this.product = new Product();
  }

  save(): void {
    this.product.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    this.images = this.cleanArrays(this.images);
    this.product.images = this.images;
    console.log(this.product);
    this.productService.save(this.product)
      .then(() => {
        this.message.success(`Thêm sản ${this.product.name} phẩm thành công!`);;
      })
      .catch(err => console.log(err));
    this.product = new Product();
  }

  onSubmit(): void {
    this.submitted = true;
    this.save();
  }

  addImage(): void {
    this.images.push('');
    this.images.forEach(value => {
      console.log(value);
    });
  }

  cleanArrays(arr: any[]): any[] {
    const propNames = Object.getOwnPropertyNames(arr);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];
      if (arr[propName] === null || arr[propName] === undefined
        || arr[propName].length === 0 || arr[propName] === '') {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
