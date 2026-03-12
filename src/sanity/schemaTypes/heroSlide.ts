import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slayd',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Şəkil',
      type: 'image',
      validation: (rule) => rule.required(),
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Şəkil alt mətni',
      type: 'string',
      description: 'Görüntü təsviri (SEO və ə accessibility)',
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
      description: 'Slaydların göstərilmə sırası (kiçik rəqəm əvvəl)',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Sıra (artan)', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Sıra (azalan)', name: 'orderDesc', by: [{ field: 'order', direction: 'desc' }] },
  ],
  preview: {
    select: { alt: 'alt', order: 'order', media: 'image' },
    prepare({ alt, order }) {
      return {
        title: alt || `Slayd ${order != null ? order + 1 : ''}`,
        subtitle: order != null ? `Sıra: ${order}` : undefined,
      }
    },
  },
})
