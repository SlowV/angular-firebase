import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../core/model/product';
import {ProductService} from '../../../../core/serivce/product.service';
import firebase from 'firebase/app';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AngularFireUploadTask} from '@angular/fire/storage';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Product = new Product();
  submitted = false;
  imagesFile: File[] = [];
  isUploading = false;

  constructor(
    private productService: ProductService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

  async save(): Promise<void> {
    this.isUploading = true;
    this.product.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    await this.pushImagesToProduct();
  }

  async uploadFiles(files: File[]): Promise<UploadTaskSnapshot[]> {
    console.log('START ', 'task upload Image');
    const tasks = files.map(async (file) => {
      const task = await this.productService.uploadImage(file);
      console.log('INSIDE ', 'task upload Image');
      task.ref.getDownloadURL().then(url => {
        this.product.images.push(url);
      });
      return task;
    });
    return await Promise.all(tasks);
  }

  async pushImagesToProduct(): Promise<void> {
    this.imagesFile = this.cleanArrays(this.imagesFile);

    console.log('PRODUCT IMAGES \n', this.product.images);
    console.log('PRODUCT\n', this.product);

    await this.uploadFiles(this.imagesFile).then(async (value) => {
      console.log('END \n', 'task upload Image');
      const productPromise = Promise.all([this.productService.save(this.product)]);
      productPromise.then((productDocRef) => {
        this.message.success(`Thêm sản phẩm ${this.product.name} phẩm thành công!`);
      });
      console.log('PRODUCT AFTER Store \n', this.product);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.save();
  }

  cleanArrays(arr: File[]): File[] {
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

  onFileSelected($event): void {
    // const v = 'đảo chiểu mùa thu.png';
    // console.log(v);
    this.imagesFile = [];
    const files = $event.target.files;
    for (const file of files) {
      this.imagesFile.push(file);
    }
  }
}
