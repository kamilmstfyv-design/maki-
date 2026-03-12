import { type SchemaTypeDefinition } from 'sanity'
import { heroSlide } from './heroSlide'
import { menuCategory } from './menuCategory'
import { product } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSlide, menuCategory, product],
}
