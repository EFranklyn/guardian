import { z } from 'zod';
import { CurrencySchema, RequiredStringSchema, StringSchema } from './commons';
import { DisplayInSchema } from './displayIn';

const DISPLAYIN_MESSAGE = 'Please select at least one option';

const dayOfWeekList = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
] as const;

const displayInPositionList = [
	'POS (SIDE)',
	'POS (TOP)',
	'TABLE (SIDE)',
	'TABLE (TOP)',
] as const;

const DisplayInPositionSchema = z.enum(displayInPositionList);

const CategoryDisplayInSchema = z
	.array(DisplayInSchema, {
		required_error: DISPLAYIN_MESSAGE,
	})
	.nonempty(DISPLAYIN_MESSAGE);

const DayOfWeekSchema = z.enum(dayOfWeekList);

const DayAvailableSchema = z.object({
	day: DayOfWeekSchema,
	start: RequiredStringSchema,
	end: RequiredStringSchema,
});
//you not need this, use inteface
const CategoryBaseSchema = z.object({
	uuid: z.string(),
	rank: z.number(),
	printRank: z.number(),
	onlineRank: z.number(),
	name: RequiredStringSchema,
	imageUrl: z.string(),
	description: z.string(),
	displayIn: z.string().array(),
	displayInPosition: z.array(DisplayInPositionSchema),
	vat: z.number(),
	disabled: z.boolean(),
	fontColor: RequiredStringSchema,
	bgColor1: RequiredStringSchema,
	bgColor2: RequiredStringSchema,
	onlineFontColor: RequiredStringSchema,
	onlineBgColor: RequiredStringSchema,
	alwaysAvailable: z.boolean(),
	daysAvailable: z.array(DayAvailableSchema),
	composeName: z.boolean(),
	categoryParentName: z.string(),
});

type Category = z.infer<typeof CategoryBaseSchema> & {
	parentUuid?: string;
};

export type { Category };
