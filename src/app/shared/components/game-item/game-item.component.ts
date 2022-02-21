import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent {
  @Input() ribbon?: string;

  @Input() jackpotAmount?: number;

  @Input() name!: string;

  @Input() src!: string;

  @Input() id!: string;

  constructor() {}

  hasRibbon(): boolean {
    return !!this.ribbon;
  }

  hasJackpotAmount(): boolean {
    return !!this.jackpotAmount;
  }
}
