import { faker } from "@faker-js/faker";
import { Category } from "../schemas/category";

const buildFakeCategory = (override: Partial<Category> = {}): Category => {
  const name = `E2E test ${faker.food.ethnicCategory()}`;
  return {
    uuid: faker.string.uuid(),
    name,
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    rank: 1,
    printRank: 1,
    onlineRank: 1,
    vat: 12,
    composeName: false,
    disabled: false,
    alwaysAvailable: true,
    fontColor: "#FFFFFF",
    bgColor1: "#FF0000",
    bgColor2: "#AA0000",
    onlineFontColor: "#000000",
    onlineBgColor: "#EEEEEE",
    displayIn: ["POS", "ONLINE"],
    displayInPosition: ["POS (SIDE)", "TABLE (SIDE)"],
    daysAvailable: [],
    ...override,
  };
};

export { buildFakeCategory };
