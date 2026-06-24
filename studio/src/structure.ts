import {StarIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Destaque da semana')
        .icon(StarIcon)
        .child(
          S.document()
            .schemaType('weeklyHighlight')
            .documentId('weeklyHighlight')
            .title('Destaque da semana'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'weeklyHighlight',
      ),
    ])
