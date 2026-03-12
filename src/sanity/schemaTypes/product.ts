import { BasketIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Məhsul',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Məhsul adı',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Şəkil',
      type: 'image',
      description: 'Məhsul şəkli (isteğe bağlı)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'price',
      title: 'Qiymət',
      type: 'number',
      validation: (rule) => rule.required().min(0),
      description: 'Əsas valyutada qiymət (məs: 12.50)',
    }),
    defineField({
      name: 'category',
      title: 'Kateqoriya',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: (rule) => rule.required(),
      description: 'Menyu kateqoriyasını seçin (Kreplər, Tostlar, İçkilər və s.)',
    }),
    defineField({
      name: 'description',
      title: 'Təsvir',
      type: 'text',
      description: 'Məhsul haqqında qısa məlumat',
    }),
  ],
  preview: {
    select: { name: 'name', categoryLabel: 'category->label', price: 'price' },
    prepare({ name, categoryLabel, price }) {
      return {
        title: name ?? 'Adsız',
        subtitle: [categoryLabel, price != null ? `$${price}` : ''].filter(Boolean).join(' · '),
      }
    },
  },
})
