/**
 * LLM API Client
 * 
 * Abstraction around OpenAI-compatible LLM APIs.
 * Supports any provider with OpenAI-compatible endpoints.
 * 
 * Environment variables:
 * - LLM_API_KEY (required)
 * - LLM_BASE_URL (default: https://api.openai.com/v1)
 * - LLM_MODEL (default: gpt-4-turbo-preview)
 */

const LLM_API_KEY = process.env.LLM_API_KEY
const LLM_BASE_URL = process.env.LLM_BASE_URL || 'https://api.openai.com/v1'
const LLM_MODEL = process.env.LLM_MODEL || 'gpt-4-turbo-preview'

if (!LLM_API_KEY) {
  throw new Error('LLM_API_KEY environment variable is required')
}

const CHAT_ENDPOINT = `${LLM_BASE_URL}/chat/completions`

/**
 * Generate guide content from a topic using LLM
 * 
 * @param {Object} params
 * @param {string} params.topic - The topic/question to generate a guide for
 * @param {string[]} [params.places] - Optional array of place names/slugs to include
 * @returns {Promise<Object>} Generated guide data
 */
export async function generateGuideFromTopic({ topic, places = [] }) {
  const prompt = buildGuidePrompt(topic, places)

  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LLM_API_KEY}`
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates engaging, informative guides about Austin, Texas. You write in a friendly, conversational tone that captures the unique character of Austin.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`LLM API error (${response.status}): ${error}`)
  }

  const data = await response.json()
  const content = JSON.parse(data.choices[0].message.content)

  // Transform LLM response into Sanity-compatible format
  return {
    title: content.title,
    slug: {
      _type: 'slug',
      current: content.slug || slugify(content.title)
    },
    summary: content.summary,
    content: convertContentToPortableText(content.content),
    guideType: content.guideType || 'list'
  }
}

/**
 * Build the prompt for guide generation
 * @param {string} topic - The topic/question
 * @param {string[]} places - Optional place names
 * @returns {string} Complete prompt
 */
function buildGuidePrompt(topic, places) {
  const placesContext = places.length > 0
    ? `\n\nSpecific places to include (if relevant): ${places.join(', ')}`
    : ''

  return `Generate a comprehensive guide about: "${topic}"

The guide should be engaging, informative, and specific to Austin, Texas.${placesContext}

Return a JSON object with the following structure:
{
  "title": "A compelling, SEO-friendly title (max 80 characters)",
  "slug": "url-friendly-slug-based-on-title",
  "summary": "A 2-3 sentence summary that hooks the reader (max 200 characters)",
  "content": "Full guide content in HTML format with proper headings, paragraphs, and lists. Use <h2> for main sections, <h3> for subsections, <p> for paragraphs, <ul>/<ol> for lists, and <strong>/<em> for emphasis.",
  "guideType": "One of: list, explainer, review, roundup, feature"
}

Make the content detailed, specific, and useful. Include practical information like locations, hours (if known), tips, and local context. Write in a friendly, conversational Austin voice.`
}

/**
 * Convert HTML content to Sanity portable text blocks
 * This is a simplified converter - you may want to enhance this
 * with a proper HTML-to-portable-text parser for complex content
 * 
 * @param {string} htmlContent - HTML string from LLM
 * @returns {Array} Portable text blocks
 */
function convertContentToPortableText(htmlContent) {
  if (!htmlContent) {
    return []
  }

  // Simple conversion: split by paragraphs and headings
  // For production, consider using a library like @portabletext/to-html or
  // a more sophisticated HTML parser
  
  // Remove HTML tags for now and create simple text blocks
  // TODO: Implement proper HTML-to-portable-text conversion
  // For now, return a simple structure that Sanity can accept
  
  const textContent = htmlContent
    .replace(/<[^>]+>/g, '') // Strip HTML tags
    .trim()

  if (!textContent) {
    return []
  }

  // Split into paragraphs and create portable text blocks
  const paragraphs = textContent
    .split(/\n\s*\n/)
    .filter(p => p.trim().length > 0)

  return paragraphs.map((text, index) => ({
    _type: 'block',
    _key: `block-${index}`,
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: `span-${index}`,
        text: text.trim(),
        marks: []
      }
    ],
    markDefs: []
  }))
}

/**
 * Generate a URL-friendly slug from a string
 * @param {string} text - Text to slugify
 * @returns {string} Slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate topic ideas/questions using LLM
 * Useful for Phase 2 topic mining
 * 
 * @param {Object} params
 * @param {string} [params.category] - Category filter (food, nightlife, etc.)
 * @param {string} [params.neighborhood] - Neighborhood filter
 * @param {number} [params.count=5] - Number of topics to generate
 * @returns {Promise<Array>} Array of topic objects
 */
export async function generateTopicIdeas({ category, neighborhood, count = 5 }) {
  const prompt = buildTopicIdeasPrompt(category, neighborhood, count)

  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LLM_API_KEY}`
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates engaging questions and topics about Austin, Texas that people would search for or ask about.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`LLM API error (${response.status}): ${error}`)
  }

  const data = await response.json()
  const content = JSON.parse(data.choices[0].message.content)

  return content.topics || []
}

/**
 * Build prompt for topic idea generation
 */
function buildTopicIdeasPrompt(category, neighborhood, count) {
  let context = 'Generate engaging questions and topics about Austin, Texas'
  
  if (category) {
    context += ` related to ${category}`
  }
  
  if (neighborhood) {
    context += ` in the ${neighborhood} neighborhood`
  }
  
  context += `.`

  return `${context}

Generate ${count} questions/topics that people would search for or ask about.

Return a JSON object with this structure:
{
  "topics": [
    {
      "question": "The question or topic",
      "category": "One of: food, comedy, nightlife, wellness, weird, other",
      "neighborhoodSlug": "optional-neighborhood-slug-if-applicable",
      "placeSlugs": ["optional-place-slug-1", "optional-place-slug-2"]
    }
  ]
}

Make the questions specific, interesting, and answerable with a guide.`
}

