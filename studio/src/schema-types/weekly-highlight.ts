import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const weeklyHighlight = defineType({
  name: 'weeklyHighlight',
  title: 'Destaque da semana',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'product',
      title: 'Produto em destaque',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Chamada',
      type: 'string',
      description: 'Exemplo: Chocolate que fala por si.',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'description',
      title: 'Descrição especial',
      type: 'text',
      rows: 3,
      description: 'Se ficar vazio, será usada a descrição do produto.',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'image',
      title: 'Imagem especial',
      type: 'image',
      description: 'Opcional. Se ficar vazia, será usada a imagem do produto.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) =>
            rule.required().warning('Descreva a imagem para acessibilidade.'),
        }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Avaliação',
      type: 'number',
      initialValue: 4.9,
      validation: (rule) => rule.required().min(0).max(5).precision(1),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Quantidade de avaliações',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'product.name',
      image: 'image',
      productImage: 'product.image',
    },
    prepare: ({title, subtitle, image, productImage}) => ({
      title: title || 'Destaque da semana',
      subtitle: subtitle || 'Selecione um produto',
      media: image || productImage,
    }),
  },
})
