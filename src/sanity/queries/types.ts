export type MenuCategory = {
  _id: string;
  slug: string | null;
  label: string;
};

export type MenuProduct = {
  _id: string;
  name: string;
  image?: { _type: string; asset?: { _ref: string } };
  price: number;
  description?: string | null;
  category: {
    _id: string;
    slug: string | null;
    label: string;
  } | null;
};
