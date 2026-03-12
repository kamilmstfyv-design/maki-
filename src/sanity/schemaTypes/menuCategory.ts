import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Menyu Kateqoriyası',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL üçün identifikator (məs: crepes, toasts). Sayt filtrindəki slug ilə eyni olmalıdır.',
      validation: (rule) => rule.required(),
      options: {
        source: 'label',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'label',
      title: 'Görünən ad',
      type: 'string',
      description: 'Menyu tablarında görünəcək ad (məs: Kreplər, Tostlar, Səhər yeməyi əlavələri)',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { label: 'label', slug: 'slug.current' },
    prepare({ label, slug }) {
      return {
        title: label ?? slug ?? 'Adsız',
        subtitle: slug ? `/${slug}` : undefined,
      }
    },
  },
})
