import { Component, Input } from '@angular/core';
import { Room } from '../room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent {

  @Input() item: Room | null = null;
  @Input() selected = false;

  constructor(private router: Router) { }

  public editRoom(): void {
    if (this.item !== null) {
      this.router.navigate(['/rooms/', this.item.id]);
    }
  }
}
