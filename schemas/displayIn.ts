import { z } from 'zod';

const displayInList = ['POS', 'ONLINE', 'TABLE', 'KIOSK'] as const;

const DisplayInSchema = z.enum(displayInList);

export { DisplayInSchema, displayInList };
