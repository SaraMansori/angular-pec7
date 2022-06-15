import { Wine } from "./wine";

export interface WineQuantityChange {
    wine: Wine;
    changeInQuantity: number;
}
