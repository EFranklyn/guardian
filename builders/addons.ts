import { faker } from "@faker-js/faker";
import { AddOn, AddOnGroup, AddOnGroupModifier } from "../schemas/addon";
import { buildFakeDisplayIn } from "./displayIn";

// export const buildFakeAddOnGroup = (override: Partial<AddOnGroup> = {}): AddOnGroup => {
//     return {
//       uuid: faker.string.uuid(),
//       name: faker.commerce.productName(),
//       displayIn: "MENU",
//       displayInOption: ['In Menu'],
//       maxChoices: 2,
//       minChoices: 1,
//       freeAmount: 1,
//       showName: true,
//       fontColor: "#000000",
//       bgColor1: "#FFFFFF",
//       bgColor2: "#EEEEEE",
//       modifiers: [],
//       disabled: false,
//       addons: [],
//       dependencies: [],
//       hideAddonsName: false,
//       ...override,
//     };
//   };

  export const buildFakeAddOnGroupModifier = (
    override: Partial<AddOnGroupModifier> = {}
  ): AddOnGroupModifier => {
    return {
      id: faker.number.int({ min: 1, max: 9999 }),
      name: faker.commerce.productAdjective(),
      noCharge: faker.datatype.boolean(),
      fontColor: "#333333",
      bgColor1: "#DDDDDD",
      bgColor2: "#BBBBBB",
      ...override,
    };
  };

  export const buildFakeAddOn = (override: Partial<AddOn> = {}): AddOn => {
    return {
      uuid: faker.string.uuid(),
      rank: faker.number.int({ min: 1, max: 10 }),
      name: faker.commerce.productName(),
      name2: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 20 })),
      price2: parseFloat(faker.commerce.price({ min: 1, max: 20 })),
      composeName: faker.datatype.boolean(),
      showPrice: faker.datatype.boolean(),
      description: faker.commerce.productDescription(),
      fontColor: "#000000",
      bgColor1: "#EEEEEE",
      bgColor2: "#CCCCCC",
      vatPrice: faker.number.float({ min: 0, max: 5 }),
      vatPerc: faker.number.float({ min: 0, max: 100 }),
      drsDeposit: faker.number.float({ min: 0, max: 1 }),
      disabled: false,
      quantity: 0,
      ...override,
    };
  };

  export const buildFakeAddOnGroup = (
    override: Partial<AddOnGroup> = {}
  ): AddOnGroup => {
    const displayIn = override.displayIn ?? buildFakeDisplayIn()
    
    
    return {
      uuid: faker.string.uuid(),
      name: faker.commerce.department(),
      displayIn,
      displayInOption: ["In Menu"],
      maxChoices: 3,
      minChoices: 1,
      freeAmount: 1,
      showName: true,
      fontColor: "#000000",
      bgColor1: "#FFFFFF",
      bgColor2: "#EEEEEE",
      modifiers: [buildFakeAddOnGroupModifier()],
      disabled: false,
      addons: [buildFakeAddOn()],
      dependencies: [],
      hideAddonsName: false,
      ...override,
    };
  };