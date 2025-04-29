import { faker } from "@faker-js/faker";

export const buildFakeDisplayIn = (
    displayIn: string[]  = ['POS', 'ONLINE', 'TABLE', 'KIOSK']
  ): string[] => {
    return faker.helpers.arrayElements(displayIn) ;
  };