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
      name: 'Back Rub', 
      price: '$45', 
      duration: '30 min', 
      description: 'Focused massage targeting tension in the upper and lower back.',
      longDescription: 'Our signature back rub is designed for those who carry stress in their shoulders and lower back. Using a combination of Swedish and trigger point techniques, we release deep-seated knots and improve posture-related discomfort.',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop'
    },
    { 
      name: 'Foot Rub', 
      price: '$40', 
      duration: '30 min', 
      description: 'Reflexology-based treatment to restore balance and relieve tired feet.',
      longDescription: 'Experience the ancient art of reflexology. By applying pressure to specific points on the feet that correspond to different body organs, we help restore your natural energy flow and provide deep relaxation for tired soles.',
      image: 'assets/images/foot-rub.jpg?v=2'
    },
    { 
      name: 'Full Body Massage', 
      price: '$80', 
      duration: '60 min', 
      description: 'Comprehensive therapeutic massage for total body relaxation.',
      longDescription: 'A complete head-to-toe experience. This treatment uses long, flowing strokes to improve circulation, reduce muscle tension, and induce a state of profound peace. Perfect for a total reset of your nervous system.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop'
    },
    { 
      name: 'Deep Tissue Massage', 
      price: '$95', 
      duration: '60 min', 
      description: 'Intense pressure to release chronic muscle tension and knots.',
      longDescription: 'Designed for athletes or those with chronic pain. We use slow, deliberate strokes and deep finger pressure to reach the deeper layers of muscle and connective tissue, breaking down adhesions and improving mobility.',
      image: 'assets/images/deep-tissue.jpg?v=2'
    },
    { 
      name: 'Hot Stone Ritual', 
      price: '$110', 
      duration: '75 min', 
      description: 'Warm stones combined with massage to melt away stress.',
      longDescription: 'Smooth, heated basalt stones are placed on key points of the body and used as an extension of the therapist\'s hands. The heat penetrates deep into the muscles, allowing for a deeper relaxation without intense pressure.',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop'
    },
    { 
      name: 'Aromatherapy Session', 
      price: '$90', 
      duration: '60 min', 
      description: 'Essential oils blended to enhance physical and emotional well-being.',
      longDescription: 'Harness the power of nature. We use high-grade essential oils tailored to your specific needs—whether you need to be energized, calmed, or decongested. The scent and skin absorption work together for holistic healing.',
      image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=800&auto=format&fit=crop'
    },
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
