import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'disabled';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.sass',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() type: string = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled: boolean = false;
  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}
