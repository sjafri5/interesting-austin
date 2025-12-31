# Suggested Topic Schema for Sanity

This document suggests a Sanity document type schema for storing discovered topics that can later be processed into guides.

## Schema Definition

```typescript
// schemaTypes/topic.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question / Topic',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'The question or topic that needs a guide'
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Google', value: 'google' },
          { title: 'LLM Generated', value: 'llm' },
          { title: 'Manual', value: 'manual' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Food', value: 'food' },
          { title: 'Comedy', value: 'comedy' },
          { title: 'Nightlife', value: 'nightlife' },
          { title: 'Wellness', value: 'wellness' },
          { title: 'Weird', value: 'weird' },
          { title: 'Other', value: 'other' }
        ],
        layout: 'dropdown'
      }
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'reference',
      to: [{ type: 'neighborhood' }],
      description: 'Optional neighborhood reference if the topic is location-specific'
    }),
    defineField({
      name: 'places',
      title: 'Places',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'place' }] }],
      description: 'Optional place references if the topic mentions specific places'
    }),
    defineField({
      name: 'handled',
      title: 'Handled',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this topic has been processed into a guide'
    }),
    defineField({
      name: 'relatedGuide',
      title: 'Related Guide',
      type: 'reference',
      to: [{ type: 'guide' }],
      description: 'The guide document created from this topic (if handled)'
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'originalUrl',
          title: 'Original URL',
          type: 'url',
          description: 'Source URL (for TikTok/Google results)'
        },
        {
          name: 'discoveredAt',
          title: 'Discovered At',
          type: 'datetime',
          initialValue: () => new Date().toISOString()
        },
        {
          name: 'rawData',
          title: 'Raw Data',
          type: 'text',
          description: 'Original raw data from the source (for debugging)'
        }
      ]
    })
  ],
  preview: {
    select: {
      question: 'question',
      source: 'source',
      category: 'category',
      handled: 'handled'
    },
    prepare({ question, source, category, handled }) {
      return {
        title: question,
        subtitle: `${source} • ${category}${handled ? ' • ✓ Handled' : ''}`
      }
    }
  }
})
```

## Usage Notes

### Adding to Schema

1. Create `schemaTypes/topic.ts` with the schema above
2. Export it from `schemaTypes/index.ts`:
   ```typescript
   import topic from './topic'
   
   export const schemaTypes = [guide, place, neighborhood, topic]
   ```

### Workflow Integration

The `topic-miner-skeleton.json` workflow can be updated to:
- Store topics directly in Sanity using this schema
- Query unhandled topics: `*[_type == "topic" && handled == false]`
- Mark topics as handled when guides are created
- Link guides back to their source topics

### Alternative: File-Based Storage

If you prefer not to create the schema yet, topics can be stored in `automation/topics.json`:

```json
{
  "topics": [
    {
      "question": "Where are the best tacos in East Austin?",
      "source": "tiktok",
      "category": "food",
      "neighborhoodSlug": "east-austin",
      "placeSlugs": [],
      "handled": false,
      "discoveredAt": "2025-01-27T00:00:00.000Z"
    }
  ]
}
```

The workflow can read from this file and process unhandled topics.

## Benefits of Sanity Schema

- **Queryable**: Easy to find unhandled topics, filter by category/source
- **Traceable**: Link guides back to source topics
- **Manageable**: Can manually review, edit, or delete topics in Sanity Studio
- **Versioned**: Sanity's draft/publish system applies
- **Searchable**: Full-text search in Sanity Studio

## Migration Path

1. **Phase 1**: Use file-based storage (`topics.json`)
2. **Phase 2**: Add `topic` schema to Sanity
3. **Phase 3**: Migrate existing topics from file to Sanity
4. **Phase 4**: Update workflows to use Sanity storage exclusively


