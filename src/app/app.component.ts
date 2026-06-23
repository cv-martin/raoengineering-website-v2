import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { AnalyticsService } from './core/services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'raoengineering-v2';

  constructor(
    private router: Router,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    /**
     * Track SPA page views on every Angular route navigation.
     *
     * GA4 fires one page_view automatically on the very first browser load
     * (via send_page_view: true in index.html). After that, the browser does NOT
     * reload the page on Angular route changes, so GA4 would not see them unless
     * we explicitly send a page_view event here.
     *
     * We skip the first NavigationEnd (index 0) because GA4 already captured it.
     */
    let navigationCount = 0;

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        navigationCount++;

        // Skip the very first navigation — GA4 already sent a page_view on load.
        if (navigationCount === 1) return;

        this.analytics.trackPageView(
          event.urlAfterRedirects,
          document.title
        );
      });
  }
}
