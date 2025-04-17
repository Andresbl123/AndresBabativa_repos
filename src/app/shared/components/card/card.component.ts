import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input() name: string = '';
  @Input() imageUrl: string = '';
  @Input() id: number = 0;

  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/pokemon', this.name]);
  }
}
