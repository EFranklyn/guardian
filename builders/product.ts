import { faker } from "@faker-js/faker";
import { Product } from "../schemas/product";
import { buildFakeAddOnGroup } from "./addons";
import { buildFakeDisplayIn } from './commons';


export const buildFakeProduct = (override: Partial<Product> = {}): Product => {
    const displayIn = buildFakeDisplayIn(override.displayIn) ?? buildFakeDisplayIn(override.displayIn)
  const name = `E2E test ${faker.commerce.productName()}`
  return {
    uuid: faker.string.uuid(),
    name,
    name2: faker.commerce.productAdjective(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
    price2: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
    displayIn:displayIn, // ou pode usar faker.helpers.arrayElements(...)
    disabled: false,
    rank: faker.number.int({ min: 1, max: 100 }),
    categoryName: faker.commerce.department(),
    drsDeposit: parseFloat(faker.commerce.price({ min: 0, max: 3 })),
    imageUrl: faker.image.url(),
    addOnGroups: [buildFakeAddOnGroup({displayIn})],
    openFood: false,
    ...override,
  };
};

