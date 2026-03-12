const categoriesQuery = /* groq */ `
  *[_type == "menuCategory"] | order(label asc) {
    _id,
    "slug": slug.current,
    label
  }
`;

const productsQuery = /* groq */ `
  *[_type == "product"] | order(name asc) {
    _id,
    name,
    image,
    price,
    description,
    category->{
      _id,
      "slug": slug.current,
      label
    }
  }
`;

const heroSlidesQuery = /* groq */ `
  *[_type == "heroSlide"] | order(order asc, _createdAt asc) {
    _id,
    image,
    alt
  }
`;

export { categoriesQuery, productsQuery, heroSlidesQuery };
