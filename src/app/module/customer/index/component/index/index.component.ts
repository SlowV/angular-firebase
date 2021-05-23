import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../core/model/category';
import {ProductService} from '../../../../../core/serivce/product.service';
import {Product} from '../../../../../core/model/product';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
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
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  public loadScript(): void {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = ['/assets/js/main.js'];

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

  ngOnInit(): void {
    this.productService.getAll(15).subscribe(products => {
      this.hotDealsProduct = products;
    });
  }

}
