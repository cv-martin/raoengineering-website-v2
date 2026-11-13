import { Component } from '@angular/core';
import { ServicePageComponent } from '../../../shared/components/service-page/service-page.component';
import { LAND_DEVELOPMENT_CONTENT } from './land-development.content';

/** Land Development page: content only; layout comes from the shared service-page template. */
@Component({
  selector: 'app-land-development',
  standalone: true,
  imports: [ServicePageComponent],
  template: `<app-service-page [content]="content"></app-service-page>`,
})
export class LandDevelopmentComponent {
  readonly content = LAND_DEVELOPMENT_CONTENT;
}
