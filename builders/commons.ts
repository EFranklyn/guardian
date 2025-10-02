import { faker } from "@faker-js/faker";

const buildFakeDisplayIn = (
    displayIn: string[]  = ['POS', 'ONLINE', 'TABLE', 'KIOSK']
  ): string[] => {
    return faker.helpers.arrayElements(displayIn) ;
  };

const buildFakeDiscountType = (
    discountType: string[]  = ['Fixed', 'Voucher', 'Order']
  ): string => {
    return faker.helpers.arrayElement(discountType) ;
  };

const buildFakeTakeawayType = (takeawayType: string[]  = ['DELIVERY', 'COLLECTION']) => {
  return faker.helpers.arrayElements(takeawayType) ;
}


const buildFakeDiscountValueType = (
    discountValueType: string[]  = ['Value', 'Percentage']
  ): string => {
    return faker.helpers.arrayElement(discountValueType) ;
  };



export { buildFakeDisplayIn, buildFakeDiscountType, buildFakeTakeawayType, buildFakeDiscountValueType };