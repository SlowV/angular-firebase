import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../../../core/model/product';
import {ProductService} from '../../../../core/serivce/product.service';
import firebase from 'firebase/app';
import {NzMessageService} from 'ng-zorro-antd/message';
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
  isUploadImagesDone = false;
  @ViewChild('file')
  file: HTMLInputElement;

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
      return task.ref.getDownloadURL().then(url => {
        return url;
      });
    });
    return await Promise.all(tasks);
  }

  async pushImagesToProduct(): Promise<void> {
    this.imagesFile = this.cleanArrays(this.imagesFile);

    console.log('PRODUCT IMAGES \n', this.product.images);
    console.log('PRODUCT\n', this.product);

    await this.uploadFiles(this.imagesFile).then(async (value) => {
      console.log('END ', 'task upload Image');
      this.product.images = value;
      this.productService.save(this.product).then(() => {
        this.message.success(`Thêm sản phẩm ${this.product.name} phẩm thành công!`);
        this.product = new Product();
        this.imagesFile = [];
        this.submitted = false;
        this.file.files = null;
        console.log('PRODUCT AFTER Store \n', this.product);
      });
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
