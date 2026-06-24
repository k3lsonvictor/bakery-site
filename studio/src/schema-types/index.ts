import type {SchemaTypeDefinition} from 'sanity'

import {product} from './product'
import {weeklyHighlight} from './weekly-highlight'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [product, weeklyHighlight],
}
