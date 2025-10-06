import {
	buildFakeDiscountType,
	buildFakeDiscountValueType,
	buildFakeTakeawayType,
} from '@builders/commons';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import type { Discount } from '../schemas/discount';

export const fakeDiscount = (override: Partial<Discount> = {}): Discount => {
	const recentDate = faker.date.recent();

	const pastDate = new Date();
	pastDate.setDate(
		recentDate.getDate() -
			faker.number.int({
				min: 1,
				max: 30,
			}),
	);

	const futureDate = new Date();
	futureDate.setDate(
		recentDate.getDate() +
			faker.number.int({
				min: 1,
				max: 30,
			}),
	);

	const days = [
		...new Set(
			Array.from(
				{
					length: faker.number.int({
						min: 0,
						max: 7,
					}),
				},
				() => faker.date.weekday(),
			),
		),
	];

	const fakeValue = {
		discountType: buildFakeDiscountType(),
		description: `E2E test ${faker.commerce.productName()}`,
		startDate: moment(pastDate).format('DD/MM/YYYY'),
		endDate: moment(futureDate).format('DD/MM/YYYY'),
		days,
		takeawayOptions: buildFakeTakeawayType(),
		valueType: buildFakeDiscountValueType(),
		value: parseFloat(
			faker.commerce.price({
				min: 1,
				max: 100,
			}),
		),
		products: [],
		voucherCode: `E2E test ${faker.string.octal({
			length: 3,
		})}`,
		usageLimit: faker.number.int({
			min: 1,
			max: 100,
		}),
		singleUse: false,
		minimumOrderValue: parseFloat(
			faker.commerce.price({
				min: 1,
				max: 100,
			}),
		),
		...override,
	};

	return fakeValue;
};
