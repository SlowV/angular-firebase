import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../../../core/model/product';
import {ProductService} from '../../../../core/serivce/product.service';
import firebase from 'firebase/app';
import {NzMessageService} from 'ng-zorro-antd/message';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

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
  countFileSelected = 0;
  arrImageLocal = [];
  Editor = DecoupledEditor;
  config = {
    placeholder: 'Nhập lội dung cho sản phẩm ...'
  };

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

  async pushImagesToProduct(): Promise<void> {
    this.imagesFile = this.cleanArrays(this.imagesFile);

    console.log('PRODUCT IMAGES \n', this.product.images);
    console.log('PRODUCT\n', this.product);

    await this.productService.uploadFiles(this.imagesFile).then(async (value) => {
      console.log('END ', 'task upload Image');
      this.product.images = value;
      this.productService.save(this.product).then(() => {
        this.message.success(`Thêm sản phẩm ${this.product.name} phẩm thành công!`);
        this.product = new Product();
        this.imagesFile = [];
        this.submitted = false;
        this.resetFrom();
        console.log('PRODUCT AFTER Store \n', this.product);
      });
    });
  }

  resetFrom(): void {
    this.file.value = null;
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

  onFileSelected($event, input: HTMLInputElement): void {
    event.preventDefault();
    this.imagesFile = [];
    this.arrImageLocal = [];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    // @ts-ignore
    for (const file of input.files) {
      const fileType = file.type;
      if (!validImageTypes.includes(fileType)) {
        this.message.error('Image type invalid!', {
          nzAnimate: true,
          nzDuration: 1000,
          nzPauseOnHover: false
        });
        this.resetFrom();
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.onload = (events: ProgressEvent<FileReader>) => {
          this.arrImageLocal.push(events.target.result);
          this.imagesFile.push(file);
        };
        reader.readAsDataURL(file);
      }
    }
    this.countFileSelected = input.files.length;
    this.resetFrom();
  }

  removeImgNew(i: number): void {
    this.arrImageLocal.splice(i, 1);
    this.imagesFile.splice(i, 1);
    this.countFileSelected = this.imagesFile.length;
  }

  onReady(editor): void {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
}
