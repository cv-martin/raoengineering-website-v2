import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { CtaComponent } from './components/cta/cta.component';

import { WhyUsComponent } from './components/why-us/why-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ServicesComponent, TestimonialComponent, CtaComponent, WhyUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { }
