import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../core/serivce/product.service';
import {Product} from '../../../../core/model/product';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import vi from '@angular/common/locales/vi';

registerLocaleData(vi);

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductListComponent implements OnInit, AfterViewInit {

  constructor(
    private productService: ProductService,
    private message: NzMessageService,
    private router: Router) {
  }

  total = 1;
  pageSize = 5;
  pageIndex = 1;
  loading = true;
  products: Product[] = [];
  size: NzButtonSize = 'small';
  checked = false;
  setOfCheckedId = new Set<string>();
  listOfCurrentPageData: ReadonlyArray<Product> = [];
  plaDateRange = ['Bắt đầu', 'Kết thúc'];
  valSearch = '';
  sortFnName = (a: Product, b: Product) => a.name.localeCompare(b.name);

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadProducts();
  }

  loadProducts(search: string = null, date: { start: string, end: string } = null): void {
    this.loading = true;
    this.productService.getAll(search, date).subscribe((products: Product[]) => {
      this.products = products;
      this.total = this.products.length;
      this.loading = false;
    });
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ReadonlyArray<Product>): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
  }

  deleteProduct(id: string, name: string): void {
    const idMsg = this.message.loading('Action in progress..', {nzDuration: 0}).messageId;
    this.productService.deleteById(id)
      .then(() => {
        this.message.success(`Xóa sản phẩm ${name} thành công!`);
        this.message.remove(idMsg);
      })
      .catch(err => console.error(err));
  }

  toCreatePage($event: Event, newTab: boolean = false): void {
    $event.stopPropagation();
    if (newTab) {
      window.open(this.router.url + '/create');
    } else {
      this.router.navigate(['admin/product', 'create']).then();
    }
  }

  getSize(images: any[]): number {
    let size = 100;
    if (images.length > 4) {
      size = 60;
    }
    return size;
  }

  toDetail($event: Event, id: string): void {
    $event.stopPropagation();
    this.router.navigate(['admin/product', 'detail', id]).then();
  }

  onChangeSearch($event): void {
    this.valSearch = $event.target.value;
    if ($event.keyCode === 13) {
      this.search();
    }
  }

  private search(): void {
    this.loadProducts(this.valSearch);
  }
}
