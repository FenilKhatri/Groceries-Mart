export const contactColumns = [
  { label: "Sr No." },
  { label: "Name", key: "name", sortable: true },
  { label: "Email", key: "email", sortable: true },
  { label: "Subject", key: "subject", sortable: true },
  { label: "Message", key: "message", sortable: true },
  { label: "View" },
];

export const vendorColumns = [
  { label: "Sr No." },
  { label: "Vendor Id", key: "_id", sortable: true },
  { label: "Vendor", key: "name", sortable: true },
  { label: "Email", key: "email", sortable: true },
  { label: "Phone", key: "phone", sortable: true },
  { label: "Actions" },
];

export const userColumns = [
  { label: "Sr No." },
  { label: "User ID", key: "_id", sortable: true },
  { label: "User Name", key: "name", sortable: true },
  { label: "Email", key: "email", sortable: true },
  { label: "Phone", key: "phone", sortable: true },
  { label: "Actions" },
];

export const shopColumns = [
  { label: "Sr No." },
  { label: "Shop", key: "name", sortable: true },
  { label: "Vendor ID", key: "_id", sortable: true },
  { label: "Phone", key: "phone", sortable: true },
  { label: "City", key: "city", sortable: true },
  { label: "Status", key: "status", sortable: true },
  { label: "Actions" },
];

export const orderColumns = [
    { label: "Sr No." },
    { label: "Total Items", key: "items", sortable: true },
    { label: "Name", key: "shippingAddress.name", sortable: true },
    { label: "Phone", key: "shippingAddress.phone", sortable: true },
    { label: "Shipping Address", key: "shippingAddress.address", sortable: true },
    { label: "Order Status", key: "orderStatus", sortable: true },
    { label: "Actions" },
];