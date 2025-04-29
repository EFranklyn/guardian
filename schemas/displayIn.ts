import { z } from "zod";

const displayInList = ["POS", "ONLINE", "TABLE", "KIOSK"] as const;

const DisplayInSchema = z.enum(displayInList);

type DisplayIn = "POS" | "ONLINE" | "TABLE" | "KIOSK";

type DisplayInOption = "In Menu" | "In Cart" | "In Edit";

export { DisplayInSchema, displayInList };
export type { DisplayIn, DisplayInOption };
