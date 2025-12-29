import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'guideType',
      title: 'Guide Type',
      type: 'string',
      options: {
        list: [
          { title: 'List', value: 'list' },
          { title: 'Explainer', value: 'explainer' },
          { title: 'Review', value: 'review' },
          { title: 'Roundup', value: 'roundup' },
          { title: 'Feature', value: 'feature' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'img',
      title: 'Image URL',
      type: 'url',
    }),
    defineField({
      name: 'places',
      title: 'Places',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'place' }] }],
    }),
    defineField({
      name: 'neighborhoods',
      title: 'Neighborhoods',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'neighborhood' }] }],
    }),
  ],
})

