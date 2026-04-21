import {ChangeDetectionStrategy, Component, signal, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);
  
  isMenuOpen = signal(false);
  formStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  expandedService = signal<string | null>(null);
  
  // Replace this with your actual Formspree ID from their dashboard
  formspreeId = 'xqewkejq';

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  services = [
    { 
      name: 'Body Work', 
      category: 'Classic',
      description: 'Our signature therapeutic massage designed to release tension and improve circulation throughout the body.',
      longDescription: 'Feel tight in your shoulder or lower back? Our Body Work session uses a combination of Swedish and trigger point techniques to release deep-seated knots and improve posture-related discomfort. Perfect for a regular wellness ritual.',
      tiers: [
        { duration: '30 min', price: '$30' },
        { duration: '60 min', price: '$40' },
        { duration: '90 min', price: '$65' },
        { duration: '120 min', price: '$80' },
      ],
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop'
    },
    { 
      name: 'Deep Tissue', 
      category: 'Advanced',
      description: 'Intense pressure to reach deeper layers of muscle and connective tissue.',
      longDescription: 'Designed for athletes or those with chronic pain. We use slow, deliberate strokes and deep finger pressure to break down adhesions, improve mobility, and target stubborn muscle knots that standard massages can\'t reach.',
      tiers: [
        { duration: '30 min', price: '$40' },
        { duration: '60 min', price: '$50' },
        { duration: '90 min', price: '$85' },
        { duration: '120 min', price: '$100' },
      ],
      image: 'https://images.unsplash.com/photo-1741522509438-a120c0bb5e88?q=80&w=800&auto=format&fit=crop'
    },
    { 
      name: 'Foot Reflexology', 
      category: 'Traditional',
      description: 'Ancient healing art focused on pressure points on the feet to restore balance.',
      longDescription: 'Experience the restorative power of reflexology. By applying pressure to specific points on the feet that correspond to different body organs, we help restore your natural energy flow and provide deep relaxation for tired soles.',
      tiers: [
        { duration: '30 min', price: '$20' },
        { duration: '60 min', price: '$30' },
        { duration: '90 min', price: '$45' },
        { duration: '120 min', price: '$60' },
      ],
      image: 'https://images.unsplash.com/photo-1706795033796-0057e5864e6d?q=80&w=800&auto=format&fit=crop'
    },
  ];

  extraServices = [
    { name: 'Cupping', price: '$20', icon: 'spa' },
    { name: 'Scraping', price: '$20', icon: 'flare' },
    { name: 'Ear Candle', price: '$30', icon: 'nights_stay' },
    { name: 'Hot Stone', price: '$10', icon: 'texture' },
  ];

  combos = [
    { name: 'Foot + Body Combo', description: '30 min Foot Reflexology + 30 min Body Work', price: '$45', icon: 'add_task' }
  ];

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleService(name: string) {
    this.expandedService.update(current => current === name ? null : name);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.isMenuOpen.set(false);
    }
  }

  onSubmit() {
    if (this.formspreeId === 'YOUR_FORMSPREE_ID_HERE') {
      alert('Please configure your Formspree ID in src/app/app.ts'); 
      return;
    }

    this.formStatus.set('submitting');
    
    this.http.post(`https://formspree.io/f/${this.formspreeId}`, this.contactData)
      .subscribe({
        next: () => {
          this.formStatus.set('success');
          this.contactData = { name: '', email: '', message: '' };
          // Reset status after 5 seconds
          setTimeout(() => this.formStatus.set('idle'), 5000);
        },
        error: () => {
          this.formStatus.set('error');
          setTimeout(() => this.formStatus.set('idle'), 5000);
        }
      });
  }
}
