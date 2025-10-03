import { z } from 'zod';

const REQUIRED_STRING_MESSAGE = 'Please type something';
const REQUIRED_VALUE_MESSAGE = 'Please enter a value greater than 0';

const EmailSchema = z
	.string()
	.email('Invalid email address')
	.optional()
	.nullable()
	.transform((val) => val ?? undefined);

const RequiredStringSchema = z
	.string({
		required_error: REQUIRED_STRING_MESSAGE,
	})
	.min(1, {
		message: REQUIRED_STRING_MESSAGE,
	});

const RequiredHourSchema = z
	.string({
		required_error: 'Required',
	})
	.regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid');

const RequiredNumberSchema = z.union([
	z
		.number({
			required_error: REQUIRED_VALUE_MESSAGE,
		})
		.gt(0, REQUIRED_VALUE_MESSAGE),
	z
		.string({
			required_error: REQUIRED_VALUE_MESSAGE,
		})
		.transform((val) => parseFloat(val))
		.refine((val) => typeof val === 'number' && val > 0, REQUIRED_VALUE_MESSAGE),
]);

const RequiredIntegerSchema = z.union([
	z
		.number({
			required_error: REQUIRED_VALUE_MESSAGE,
		})
		.int()
		.positive({
			message: REQUIRED_VALUE_MESSAGE,
		}),
	z
		.string({
			required_error: REQUIRED_VALUE_MESSAGE,
		})
		.transform((val) => Number(val))
		.refine((val) => Number.isInteger(val) && val > 0, 'Invalid value'),
]);

const NumberSchema = z.union([
	z.number().optional(),
	z
		.string()
		.transform((val) => parseFloat(val))
		.optional()
		.default('0'),
]);

const RequiredCurrencySchema = z
	.string({
		required_error: REQUIRED_VALUE_MESSAGE,
	})
	.regex(/^\d+(\.\d{1,2})?$/, 'Invalid value')
	.transform((val) => parseFloat(val))
	.refine((val) => typeof val === 'number' && val > 0, REQUIRED_VALUE_MESSAGE);

const CurrencySchema = z.union([
	z.number().nullable().optional(),
	z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/, 'Invalid value')
		.transform((val) => parseFloat(val))
		.optional()
		.nullable()
		.default('0'),
]);

const StringSchema = z
	.string()
	.optional()
	.nullable()
	.transform((val) => val ?? undefined);

export {
	CurrencySchema,
	EmailSchema,
	NumberSchema,
	RequiredCurrencySchema,
	RequiredHourSchema,
	RequiredNumberSchema,
	RequiredIntegerSchema,
	RequiredStringSchema,
	StringSchema,
};
