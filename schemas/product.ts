import { AddOnGroup } from "./addon";
import { DisplayIn } from "./displayIn";

export interface Product {
  uuid?: string;
  name: string;
  name2: string;
  description: string;
  price: number;
  price2: number;
  displayIn: string[];  //alert
  disabled: boolean;
  rank: number;
  categoryName: string;
  drsDeposit: number;
  imageUrl: string;
  addOnGroups: AddOnGroup[],
  openFood: boolean   // alert
}
