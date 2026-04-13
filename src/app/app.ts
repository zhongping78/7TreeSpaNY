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
  
  // Replace this with your actual Formspree ID from their dashboard
  formspreeId = 'xqewkejq';

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  services = [
    { name: 'Back Rub', price: '$45', duration: '30 min', description: 'Focused massage targeting tension in the upper and lower back.' },
    { name: 'Foot Rub', price: '$40', duration: '30 min', description: 'Reflexology-based treatment to restore balance and relieve tired feet.' },
    { name: 'Full Body Massage', price: '$80', duration: '60 min', description: 'Comprehensive therapeutic massage for total body relaxation.' },
    { name: 'Deep Tissue Massage', price: '$95', duration: '60 min', description: 'Intense pressure to release chronic muscle tension and knots.' },
    { name: 'Hot Stone Ritual', price: '$110', duration: '75 min', description: 'Warm stones combined with massage to melt away stress.' },
    { name: 'Aromatherapy Session', price: '$90', duration: '60 min', description: 'Essential oils blended to enhance physical and emotional well-being.' },
  ];

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
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
