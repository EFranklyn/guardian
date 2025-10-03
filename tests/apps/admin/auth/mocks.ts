const PROTECTED_ROUTES = [
	{
		name: 'Dashboard',
		path: 'dashboard',
	},
	{
		name: 'Order',
		path: 'order',
	},
	{
		name: 'Order List',
		path: 'order/list',
	},
	{
		name: 'Registers',
		path: 'crud',
	},
	{
		name: 'Categories',
		path: 'crud/category',
	},
	{
		name: 'Category List',
		path: 'crud/category/list',
	},
	{
		name: 'Create Category',
		path: 'crud/category/create',
	},
	{
		name: 'Edit Category',
		path: 'crud/category/:uuid',
	},
	{
		name: 'Preview Category',
		path: 'crud/category/preview/:uuid',
	},
	{
		name: 'Products',
		path: 'crud/product',
	},
	{
		name: 'Product List',
		path: 'crud/product/list',
	},
	{
		name: 'Create Product',
		path: 'crud/product/create',
	},
	{
		name: 'Edit Product',
		path: 'crud/product/:uuid',
	},
	{
		name: 'Preview Product',
		path: 'crud/product/preview/:uuid',
	},
	{
		name: 'Duplicate Product',
		path: 'crud/product/duplicate/:uuid',
	},
	{
		name: 'Addons',
		path: 'crud/addons',
	},
	{
		name: 'Addon Group List',
		path: 'crud/addons/list',
	},
	{
		name: 'Create Addon Group',
		path: 'crud/addons/create',
	},
	{
		name: 'Edit Addon Group',
		path: 'crud/addons/:uuid',
	},
	{
		name: 'Preview Addon Group',
		path: 'crud/addons/preview/:uuid',
	},
	{
		name: 'Customers',
		path: 'crud/customers',
	},
	{
		name: 'Customer List',
		path: 'crud/customers/list',
	},
	{
		name: 'Edit Customer',
		path: 'crud/customers/:uuid',
	},
	{
		name: 'Preview Customer',
		path: 'crud/customers/preview/:uuid',
	},
	{
		name: 'Discounts',
		path: 'crud/discount',
	},
	{
		name: 'Discount List',
		path: 'crud/discount/list',
	},
	{
		name: 'Create Discount',
		path: 'crud/discount/create',
	},
	{
		name: 'Edit Discount',
		path: 'crud/discount/:uuid',
	},
	{
		name: 'Preview Discount',
		path: 'crud/discount/preview/:uuid',
	},
	{
		name: 'Tables',
		path: 'crud/table',
	},
	{
		name: 'Table List',
		path: 'crud/table/list',
	},
	{
		name: 'Create Table',
		path: 'crud/table/create',
	},
	{
		name: 'Edit Table',
		path: 'crud/table/:uuid',
	},
	{
		name: 'Preview Table',
		path: 'crud/table/preview/:uuid',
	},
	{
		name: 'Restaurants',
		path: 'crud/company',
	},
	{
		name: 'Restaurant List',
		path: 'crud/company/list',
	},
	{
		name: 'Create Restaurant',
		path: 'crud/company/create',
	},
	{
		name: 'Edit Restaurant',
		path: 'crud/company/:uuid',
	},
	{
		name: 'Preview Restaurant',
		path: 'crud/company/preview/:uuid',
	},
	{
		name: 'Print Group',
		path: 'crud/printgroups',
	},
	{
		name: 'Print Group List',
		path: 'crud/printgroups/list',
	},
	{
		name: 'Create Print Group',
		path: 'crud/printgroups/create',
	},
	{
		name: 'Edit Print Group',
		path: 'crud/printgroups/:uuid',
	},
	{
		name: 'Preview Print Group',
		path: 'crud/printgroups/preview/:uuid',
	},
	{
		name: 'Users',
		path: 'users',
	},
	{
		name: 'User List',
		path: 'users/list',
	},
	{
		name: 'Create User',
		path: 'users/create',
	},
	{
		name: 'Edit User',
		path: 'users/:uuid',
	},
	{
		name: 'Preview User',
		path: 'users/preview/:uuid',
	},
	{
		name: 'Preferences',
		path: 'preferences',
	},
	{
		name: 'General',
		path: 'preferences/general',
	},
	{
		name: 'Kiosk',
		path: 'preferences/kiosk',
	},
	{
		name: 'POS',
		path: 'preferences/pos',
	},
	{
		name: 'Website',
		path: 'preferences/website',
	},
];

export { PROTECTED_ROUTES };
