import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TitleCasePipe} from "@angular/common";

function ascOrder<T>(curr: T, next: T): number {
  if (curr > next) {
    return 1;
  }

  if (curr < next) {
    return -1;
  }

  return 0;
}

function descOrder<T>(curr: T, next: T): number {
  if (curr < next) {
    return 1;
  }

  if (curr > next) {
    return -1;
  }

  return 0;
}

interface Tab {
  label: string;
  routerLink: string;
}

type TabOrder = 'asc' | 'desc';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabBarComponent {
  private _tabs: Tab[]
  private tabOrder: TabOrder;

  @Input()
  set tabBars(tabs: string[] | undefined) {
    if (tabs && tabs.length > 0) {
      this._tabs = [
        ...tabs
          .filter(tab => !(
            tab === 'virtual' ||
            tab === 'ball' ||
            tab === 'fun'
          ))
          .map(tab => ({
            label: this.titleCasePipe.transform(tab),
            routerLink: tab
          })),
        {
          label: 'Other',
          routerLink: 'other'
        }
      ].sort(this.isDesc() ? descOrder : ascOrder);
    }
  }

  @Input()
  set tabBarsOrder(order: TabOrder) {
    this.tabOrder = order;
    this._tabs = this._tabs.sort(this.isDesc() ? descOrder : ascOrder);
  }

  get tabs(): Tab[] {
    return [...this._tabs];
  }

  constructor(private titleCasePipe: TitleCasePipe) {
    this._tabs = [];
    this.tabOrder = 'desc';
  }

  private isDesc(): boolean {
    return this.tabOrder === 'desc';
  }
}
