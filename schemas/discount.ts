

const dayOfWeekList = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
] as const;

type DayOfWeek = typeof dayOfWeekList[number];

// const discountTypeList = ['Fixed', 'Voucher', 'Order'] as const; // ok

const discountValueTypeList = ['Value', 'Percentage'] as const; //ok

// const takeawayTypeList = ['DELIVERY', 'COLLECTION'] as const;

interface ProductDiscount {
    name: string;
    category: string;
    price: string
}

interface Discount {
    discountType: string;
    description: string;
    voucherCode: string;
    startDate: string;
    endDate: string;
    days?: string[] | null;
    takeawayOptions: string[];
    valueType: string;
    value: number;
    minimumOrderValue: number;
    usageLimit: number;
    singleUse: boolean;
    products: ProductDiscount[];
    // products?: Product[] | null;
}

export {
    Discount,
};
