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
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for accessibility and SEO.',
            },
          ],
        },
      ],
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

