import { faker } from "@faker-js/faker";
import { Product } from "../schemas/product";
import { buildFakeAddOnGroup } from "./addons";
import { buildFakeDisplayIn } from './displayIn';


export const buildFakeProduct = (override: Partial<Product> = {}): Product => {
    const displayIn = buildFakeDisplayIn(override.displayIn) ?? buildFakeDisplayIn(override.displayIn)

  return {
    uuid: faker.string.uuid(),
    name: faker.commerce.productName(),
    name2: faker.commerce.productAdjective(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
    price2: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
    displayIn:displayIn, // ou pode usar faker.helpers.arrayElements(...)
    disabled: false,
    rank: faker.number.int({ min: 1, max: 100 }),
    categoryName: faker.commerce.department(),
    drsDeposit: faker.number.float({ min: 0, max: 5 }),
    imageUrl: faker.image.url(),
    addongroups: [buildFakeAddOnGroup({displayIn})],
    openFood: false,
    ...override,
  };
};

