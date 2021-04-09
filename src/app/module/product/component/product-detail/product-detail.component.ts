import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../core/serivce/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../core/model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      const id = value.id;
      this.productService.getById(id).subscribe((product) => {
        this.product = product;
        console.log(this.product);
      });
    });
  }
}
