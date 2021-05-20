import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

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
      url: '/assets/images/demos/demo-13/slider/slide-2.png',
      subtitle: 'Trevel & Outdoor',
      title: 'Original Outdoor <br>Beanbag',
      price: '<sup class="font-weight-light line-through">$89,99</sup>\n' +
             '<span class="text-primary">$29<sup>,99</sup></span>'
    },
    {
      id: '3',
      url: '/assets/images/demos/demo-13/slider/slide-3.png',
      subtitle: 'Fashion Promotions',
      title: 'Tan Suede <br>Biker Jacket',
      price: '<sup class="font-weight-light line-through">$240,00</sup>\n' +
             '<span class="text-primary">$180<sup>,99</sup></span>'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
