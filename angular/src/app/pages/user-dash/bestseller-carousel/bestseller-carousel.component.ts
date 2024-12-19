import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

interface cardimgs {
  id: number;
  time: string;
  imgSrc: string;
  user: string;
  title: string;
  views: string;
  category: string;
  comments: number;
  date: string;
  name: string;
  qty: number;
}
@Component({
  selector: 'app-bestseller-carousel',
  standalone: true,
  imports: [TablerIconsModule, MaterialModule, MatCardModule, CommonModule],
  templateUrl: './bestseller-carousel.component.html',
  styleUrl: './bestseller-carousel.component.scss',
})
export class BestsellerCarouselComponent implements OnInit {
  cardimgs: any[] = [];

  bestseller: cardimgs[] = [
    {
      id: 1,
      time: 'Best Seller',
      imgSrc: '/assets/images/blog/Bulgrits.jpg',
      user: '/assets/images/profile/user-1.jpg',
      title: 'As yen tumbles, gadget-loving Japan goes for iPhones',
      views: '9,125',
      category: 'Food',
      comments: 3,
      date: '₱ 180.00',
      name: 'Burger',
      qty: 1,
    },
    {
      id: 2,
      time: '2 mins Read',
      imgSrc: '/assets/images/blog/Seseg.jpg',
      user: '/assets/images/profile/user-2.jpg',
      title:
        'Intel loses bid to revive antitrust case against patent foe Fortress',
      views: '9,125',
      category: 'Gadget',
      comments: 3,
      date: '₱ 250.00',
      name: 'Pork Sisig',
      qty: 1,
    },
    {
      id: 3,
      time: '2 mins Read',
      imgSrc: '/assets/images/blog/Spaget.jpg',
      user: '/assets/images/profile/user-3.jpg',
      title: 'COVID outbreak deepens as more lockdowns loom in China',
      views: '9,125',
      category: 'Health',
      comments: 12,
      date: '₱ 199.00',
      name: 'Spagetti',
      qty: 1,
    },
  ];

  constructor() {}
  ngOnInit(): void {
    this.startCarousel();
  }

  currentSlide = 0;
  interval: any;
  carouselTransform = 'translateX(0)';

  startCarousel() {
    this.interval = setInterval(() => this.nextSlide(), 3000);
  }

  pauseCarousel() {
    clearInterval(this.interval);
  }

  resumeCarousel() {
    this.startCarousel();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.bestseller.length;
    this.updateTransform();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.bestseller.length) % this.bestseller.length;
    this.updateTransform();
  }

  updateTransform() {
    this.carouselTransform = `translateX(-${this.currentSlide * 100}%)`;
  }
}
