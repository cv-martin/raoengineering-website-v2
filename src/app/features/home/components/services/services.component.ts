import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../../../core/models/service.model';
import { Router, RouterModule } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  constructor(private router: Router) { }

  services: Service[] = [
    {
      id: 'land-development',
      title: 'Land Development',
      icon: 'assets/land-development-aerial.png',
      iconSubtle: 'assets/icon_land_development_1768626452122.png',
      description: 'Transforming raw land into well-planned, functional, and sustainable communities.',
      timeline: [
        { phase: 'Planning', description: 'Site analysis and conceptual layout.' },
        { phase: 'Entitlement', description: 'Zoning approvals and regulatory clearance.' },
        { phase: 'Engineering', description: 'Civil design and infrastructure planning.' },
        { phase: 'Build', description: 'Construction administration and closeout.' }
      ],
      solutions: ['Site Planning', 'Grading & Drainage', 'Utility Design', 'Roadway Design'],
      strategies: ['Community Focused', 'Environmentally Conscious', 'Maximize Land Value'],
      valueProps: [
        { label: 'Time Saved', value: '20%' },
        { label: 'Plot Use', value: 'Max' },
        { label: 'Value', value: 'High' }
      ]
    },
    {
      id: 'water-resources',
      title: 'Water Resources',
      icon: 'assets/water-hero-v2.png',
      iconSubtle: 'assets/icon_water_hill_country.png',
      description: 'Comprehensive water management solutions ensuring sustainable and efficient resource utilization.',
      timeline: [
        { phase: 'Analysis', description: 'Hydrologic modeling and feasibility studies.' },
        { phase: 'Design', description: 'Stormwater management and drainage systems.' },
        { phase: 'Permitting', description: 'Regulatory compliance and agency approvals.' },
        { phase: 'Construction', description: 'Implementation oversight and quality assurance.' }
      ],
      solutions: ['Stormwater Management', 'Floodplain Analysis', 'Drainage Design', 'Water Quality'],
      strategies: ['Sustainable Design', 'Regulatory Compliance', 'Cost-Effective Solutions'],
      valueProps: [
        { label: 'Efficiency', value: '+30%' },
        { label: 'Compliance', value: '100%' },
        { label: 'ROI', value: 'High' }
      ]
    },
    {
      id: 'transportation',
      title: 'Transportation',
      icon: 'assets/transportation hero.png',
      iconSubtle: 'assets/icon_transportation_high_five.png',
      description: 'Designing safe and efficient transportation systems and public infrastructure to connect communities.',
      timeline: [
        { phase: 'Study', description: 'Traffic impact analysis and route planning.' },
        { phase: 'Design', description: 'Roadway, intersection, and signal design.' },
        { phase: 'Approval', description: 'Agency coordination and permitting.' },
        { phase: 'Execute', description: 'Construction support and inspection.' }
      ],
      solutions: ['Traffic Engineering', 'Roadway Design', 'Signalization', 'Access Management'],
      strategies: ['Safety First', 'Efficient Flow', 'Future Proofing'],
      valueProps: [
        { label: 'Safety', value: 'A+' },
        { label: 'Flow', value: 'Optimized' },
        { label: 'Connect', value: 'Seamless' }
      ]
    },
    {
      id: 'environmental',
      title: 'Environmental',
      icon: 'assets/environment/environmental-hero.png',
      iconSubtle: 'assets/icon_environmental_aquifer.png',
      description: 'Protecting natural resources while enabling sustainable development.',
      timeline: [
        { phase: 'Assess', description: 'Environmental site assessments and impact studies.' },
        { phase: 'Mitigate', description: 'Developing strategies to minimize environmental impact.' },
        { phase: 'Permit', description: 'Navigating complex environmental regulations.' },
        { phase: 'Monitor', description: 'Ongoing compliance and environmental stewardship.' }
      ],
      solutions: ['Environmental Assessments', 'Wetland Delineation', 'Permitting', 'Compliance'],
      strategies: ['Sustainability', 'Conservation', 'Regulatory Navigation'],
      valueProps: [
        { label: 'Impact', value: 'Low' },
        { label: 'Compliance', value: 'Full' },
        { label: 'Legacy', value: 'Green' }
      ]
    },
    {
      id: 'permitting',
      title: 'Permitting',
      icon: 'assets/permitting-focus.png',
      iconSubtle: 'assets/icon_permitting_approval.png',
      description: 'Streamlining the regulatory process to accelerate project timelines.',
      timeline: [
        { phase: 'Review', description: 'Code analysis and requirement identification.' },
        { phase: 'Prepare', description: 'Application preparation and documentation.' },
        { phase: 'Submit', description: 'Agency submission and coordination.' },
        { phase: 'Approve', description: 'Securing necessary permits and approvals.' }
      ],
      solutions: ['Permit Expediting', 'Code Consulting', 'Agency Coordination', 'Variance Requests'],
      strategies: ['Proactive Approach', 'Expert Knowledge', 'Relationship Building'],
      valueProps: [
        { label: 'Speed', value: 'Fast' },
        { label: 'Approval', value: 'Guaranteed' },
        { label: 'Hassle', value: 'Zero' }
      ]
    }
  ];

  handleServiceClick(service: Service) {
    this.navigateToService(service.id);
  }

  navigateToService(serviceId: string) {
    // Map service IDs to routes if they differ, otherwise direct mapping
    this.router.navigate(['/services', serviceId]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
