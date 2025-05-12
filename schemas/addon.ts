import { DisplayInOption } from "./displayIn";


interface AddOnGroupBase {
  uuid: string;
  name: string;
  displayIn: string[];
  displayInOption?: DisplayInOption[];
}

interface AddOn {
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

interface AddOnGroupModifier {
  id?: number;
  name: string;
  noCharge: boolean;
  fontColor: string;
  bgColor1: string;
  bgColor2: string;
}

interface AddOnGroup extends AddOnGroupBase {
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

interface ExtraAddon {
  uuid: string;
  name: string;
  name2: string;
  price: number;
  price2: number;
  vatPrice: number;
  vatPerc: number;
  drsDeposit: number;
  disabled: boolean;
  description: string;
  fontColor: string;
  bgColor1: string;
  bgColor2: string;

}

interface ExtraAddonGroup extends Omit<AddOnGroupBase, 'displayIn' | 'displayInOption'> {
  rank: number;
  maxChoices: number;
  minChoices: number;
  freeAmount: number;
  hideAddonsName: boolean;
  showName: boolean;
  disabled: boolean;
  fontColor: string;
  bgColor1: string;
  bgColor2: string;
  modifiers: AddOnGroupModifier[];
  addons: ExtraAddon[];

}

export type{ExtraAddonGroup, ExtraAddon, AddOnGroup, AddOnGroupModifier, AddOn}
