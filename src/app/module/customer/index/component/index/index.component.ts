import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../core/model/category';
import {ProductService} from '../../../../../core/serivce/product.service';
import {Product} from '../../../../../core/model/product';
import {LoadScript} from '../../../../../core/utils/LoadScript';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends LoadScript implements OnInit {
  slideTemplate = [
    {
      id: '1',
      url: '/assets/images/demos/demo-13/slider/slide-1.png',
      subtitle: 'Trade-In Offer',
      title: 'MacBook Air <br>Latest Model',
      price: '<sup class="font-weight-light">from</sup>\n' +
        '<span class="text-primary">$999<sup>,99</sup></span>'
    },
    {
      id: '2',
      url: '/assets/images/demos/demo-13/slider/slide-2.jpg',
      subtitle: 'Trevel & Outdoor',
      title: 'Original Outdoor <br>Beanbag',
      price: '<sup class="font-weight-light line-through">$89,99</sup>\n' +
        '<span class="text-primary">$29<sup>,99</sup></span>'
    },
    {
      id: '3',
      url: '/assets/images/demos/demo-13/slider/slide-3.jpg',
      subtitle: 'Fashion Promotions',
      title: 'Tan Suede <br>Biker Jacket',
      price: '<sup class="font-weight-light line-through">$240,00</sup>\n' +
        '<span class="text-primary">$180<sup>,99</sup></span>'
    },
  ];
  categories = [
    {
      id: '1',
      name: 'Computer & Laptop',
      image: '/assets/images/demos/demo-13/cats/1.jpg'
    },
    {
      id: '2',
      name: 'Lighting',
      image: '/assets/images/demos/demo-13/cats/2.jpg'
    },
    {
      id: '3',
      name: 'Smart Phones',
      image: '/assets/images/demos/demo-13/cats/3.jpg'
    },
    {
      id: '4',
      name: 'Televisions',
      image: '/assets/images/demos/demo-13/cats/4.jpg'
    },
    {
      id: '5',
      name: 'Cooking',
      image: '/assets/images/demos/demo-13/cats/5.jpg'
    },
    {
      id: '6',
      name: 'Furniture',
      image: '/assets/images/demos/demo-13/cats/6.jpg'
    }
  ] as Category[];
  loadAPI: Promise<any>;
  hotDealsProduct: Product[] = [];

  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.productService.getAll(15).subscribe(products => {
      this.hotDealsProduct = products;
      this.loadAPI = new Promise((resolve) => {
        super.loadScript('/assets/js/main.js');
        super.loadScript('/assets/js/demo-13.js');
        resolve(true);
      });
    });
  }

}
