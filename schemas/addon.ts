import { DisplayInOption } from "./displayIn";


export interface AddOnGroupBase {
  uuid: string;
  name: string;
  displayIn: string[];
  displayInOption?: DisplayInOption[];
}

export interface AddOn {
  uuid: string;
  rank: number;
  name: string;
  name2: string;
  price: number;
  price2: number;
  composeName: boolean;
  showPrice: boolean;
  description: string;
  fontColor: string;
  bgColor1: string;
  bgColor2: string;
  vatPrice: number;
  vatPerc: number;
  drsDeposit: number;
  disabled: boolean;
  quantity?: number; // default(0), mas na tipagem continua opcional
}

export interface AddOnGroupModifier {
  id?: number;
  name: string;
  noCharge: boolean;
  fontColor: string;
  bgColor1: string;
  bgColor2: string;
}

export interface AddOnGroup extends AddOnGroupBase {
  maxChoices: number;
  minChoices: number;
  freeAmount: number;
  showName: boolean;
  fontColor: string;
  bgColor1: string;
  bgColor2: string;
  modifiers: AddOnGroupModifier[];
  disabled: boolean;
  addons: AddOn[];
  dependencies: AddOn[];
  hideAddonsName: boolean;
}