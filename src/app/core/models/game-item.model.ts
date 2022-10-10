import {GameItem} from "./game-item.inteface";
import {GameJackpot} from "./game-jackpot.interface";

export class GameItemModel implements GameItem {
  categories: string[];
  id: string;
  image: string;
  name: string;

  jackpotAmount?: number;

  constructor(gamaItem: GameItem) {
    const {id, name, image, categories} = gamaItem;

    this.id = id;
    this.name = name;
    this.image = image;
    this.categories = [...categories];
  }

  set jackpot(jackpotsEntity: Record<string, number>) {
    this.jackpotAmount = jackpotsEntity[this.id];
  }

  isNew(): boolean {
    return this.categories.indexOf('new') !== -1;
  }

  isTop(): boolean {
    return this.categories.indexOf('top') !== -1;
  }

  getLabel(): string | undefined {
    if (this.isNew()) {
      return 'New';
    }

    if (this.isTop()) {
      return 'Top';
    }

    return undefined;
  }
}
