import type { ItemStatus } from "@/domain/types";

export const t = {
  appTitle: "list3d",
  appSubtitle: "3D print orders & settlement, at a glance",
  shareLink: "Share link",
  shareLinkSoon: "soon",

  summary: {
    grossTotal: "Order total",
    deliveredValue: "Delivered value",
    itemCount: "Items",
    deliveredItemCount: "Delivered items",
  },

  statusLabels: {
    quoted: "Quoted",
    approved: "Approved",
    in_production: "In production",
    ready: "Ready",
    delivered: "Delivered",
  } satisfies Record<ItemStatus, string>,

  form: {
    addTitle: "Add item",
    editTitle: "Edit item",
    name: "Name",
    namePlaceholder: "e.g. Miniature base insert",
    category: "Category",
    categoryPlaceholder: "e.g. Organizers",
    quantity: "Quantity",
    unitPrice: "Unit price",
    status: "Status",
    submitAdd: "Add item",
    submitEdit: "Save changes",
    cancel: "Cancel",
  },

  errors: {
    nameRequired: "Enter a name for this item.",
    quantityInvalid: "Quantity must be a whole number of 1 or more.",
    unitPriceInvalid: "Enter a price like 12,50 or 12.50.",
  },

  list: {
    empty: "No items yet. Add the first one above.",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Delete this item?",
    confirmDeleteYes: "Yes, delete",
    confirmDeleteNo: "Cancel",
    otherCategory: "Other",
  },
};

export type ErrorKey = keyof typeof t.errors;
