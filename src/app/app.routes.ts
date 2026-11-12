import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SeoData } from './core/services/seo.service';

/**
 * Every route carries `data.seo`. AppComponent applies it on each navigation,
 * so each page has its own title, description and canonical URL instead of
 * sharing the single set declared in index.html.
 *
 * Keep titles under 60 characters and descriptions between 120 and 160.
 */
export const DEFAULT_SEO: SeoData = {
  title: "Civil Engineering in Texas | Rao's Consulting Engineers",
  description:
    "Rao's Consulting Engineers (RCE) provides civil engineering services in land development, water resources, transportation, environmental, and permitting across Texas."
};

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { seo: DEFAULT_SEO }
  },
  {
    path: 'services/water-resources',
    loadComponent: () => import('./features/services/water-resources/water-resources.component').then(m => m.WaterResourcesComponent),
    data: {
      seo: {
        title: "Water Resources & Drainage Engineering | RCE Texas",
        description:
          "Stormwater analysis, detention design, drainage studies and floodplain review for Texas land development projects, by Rao's Consulting Engineers."
      } satisfies SeoData
    }
  },
  {
    path: 'services/land-development',
    loadComponent: () => import('./features/services/land-development/land-development.component').then(m => m.LandDevelopmentComponent),
    data: {
      seo: {
        title: "Land Development & Site Plan Engineering | RCE Texas",
        description:
          "Site plans, grading, utilities and subdivision engineering for commercial, retail, residential and multi-family development across Texas."
      } satisfies SeoData
    }
  },
  {
    path: 'services/transportation',
    loadComponent: () => import('./features/services/transportation/transportation.component').then(m => m.TransportationComponent),
    data: {
      seo: {
        title: "Transportation & Traffic Engineering | RCE Texas",
        description:
          "Traffic impact analyses, driveway access and roadway design for Texas developments, coordinated with TxDOT and local jurisdictions."
      } satisfies SeoData
    }
  },
  {
    path: 'services/environmental',
    loadComponent: () => import('./features/services/environmental/environmental.component').then(m => m.EnvironmentalComponent),
    data: {
      seo: {
        title: "Environmental & Edwards Aquifer Permitting | RCE Texas",
        description:
          "Environmental engineering and TCEQ Edwards Aquifer protection plans, including WPAP and CZP submittals, for Texas development sites."
      } satisfies SeoData
    }
  },
  {
    path: 'services/permitting',
    loadComponent: () => import('./features/services/permitting/permitting.component').then(m => m.PermittingComponent),
    data: {
      seo: {
        title: "Development Permitting Services | RCE Texas",
        description:
          "Permitting and regulatory coordination with Texas cities, counties, TCEQ and TxDOT, from application through approval, by Rao's Consulting Engineers."
      } satisfies SeoData
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    data: {
      seo: {
        title: "About Rao's Consulting Engineers | Texas Civil Engineers",
        description:
          "Rao's Consulting Engineers is a Texas civil engineering firm serving land development, water resources, transportation, environmental and permitting clients."
      } satisfies SeoData
    }
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience-page.component').then(m => m.ExperiencePageComponent),
    data: {
      seo: {
        title: "Projects & Engineering Experience | RCE Texas",
        description:
          "Selected civil engineering projects by Rao's Consulting Engineers, covering land development, drainage, transportation and permitting work across Texas."
      } satisfies SeoData
    }
  },
  {
    path: 'experience/:slug',
    loadComponent: () => import('./features/experience/components/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    data: {
      seo: {
        title: "Project Detail | Rao's Consulting Engineers",
        description:
          "Civil engineering project detail from Rao's Consulting Engineers, a Texas firm working in land development, drainage, transportation and permitting."
      } satisfies SeoData
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    data: {
      seo: {
        title: "Contact Rao's Consulting Engineers | Texas Civil Engineers",
        description:
          "Request an engineering consultation with Rao's Consulting Engineers for land development, drainage, transportation, environmental or permitting work in Texas."
      } satisfies SeoData
    }
  },
  {
    path: 'careers',
    loadComponent: () => import('./features/careers/careers.component').then(m => m.CareersComponent),
    data: {
      seo: {
        title: "Careers | Rao's Consulting Engineers",
        description:
          "Civil engineering career opportunities at Rao's Consulting Engineers, a Texas firm working in land development, water resources, transportation and permitting."
      } satisfies SeoData
    }
  },
  { path: '**', redirectTo: '' }
];
