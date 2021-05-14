import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../core/serivce/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../core/model/product';
import {NzMessageService} from 'ng-zorro-antd/message';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {LocalStorageUtil} from '../../../../core/utils/LocalStorageUtil';
import {User} from '../../../../core/model/user';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {ObjectUtils} from '../../../../core/utils/ObjectUtils';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    product: Product;
    isEditing: any;
    id = '';
    arrImageLocal = [];
    arrImageFileNew: File[] = [];
    editor = DecoupledEditor;
    config = {
        placeholder: 'Nhập lội dung cho sản phẩm ...'
    };

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private message: NzMessageService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(value => {
            this.id = value.id;
            this.getData(this.id);
        });
        this.isEditing = false;
        window.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                event.preventDefault();
            }
        });
    }

    getData(id: string): void {
        this.productService.getById(id).subscribe(product => {
            this.product = product;
        });
    }

    update(): void {
        this.productService.uploadFiles(this.arrImageFileNew).then(async (images) => {
            this.product.images = this.product.images.concat(images);
            this.product.updatedBy = LocalStorageUtil.getData<User>('user').displayName;
            this.product.updatedAt = Timestamp.fromDate(new Date());
            this.productService.update(this.id, this.product).then(() => {
                this.message.success('Upload success!');
                this.getData(this.id);
                this.arrImageFileNew = [];
                this.arrImageLocal = [];
                this.isEditing = false;
            });
        });
    }

    removeImageTmp(index: number): void {
        this.product.images.splice(index, 1);
    }

    removeImgNew(index): void {
        this.arrImageLocal.splice(index, 1);
        this.arrImageFileNew.splice(index, 1);
    }

    changeFileImg($event: any, input: HTMLInputElement): void {
        event.preventDefault();
        this.arrImageFileNew = [];
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
                input.files = null;
                return;
            }

            if (file) {
                const reader = new FileReader();
                reader.onload = (events: ProgressEvent<FileReader>) => {
                    this.arrImageLocal.push(events.target.result);
                    this.arrImageFileNew.push(file);
                };
                reader.readAsDataURL(file);
            }

        }
    }

    onReady(editor): void {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    changeContentEdit(): void {
    }
}
