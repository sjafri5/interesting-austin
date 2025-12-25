/**
 * Sanity HTTP API Client
 * 
 * Minimal client wrapper for Sanity's HTTP mutate API.
 * Uses built-in fetch (Node 18+) or falls back to node-fetch if needed.
 * 
 * Environment variables:
 * - SANITY_PROJECT_ID (default: ow7iqhbw)
 * - SANITY_DATASET (default: production)
 * - SANITY_WRITE_TOKEN (required)
 */

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ow7iqhbw'
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN

if (!SANITY_WRITE_TOKEN) {
  throw new Error('SANITY_WRITE_TOKEN environment variable is required')
}

const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-08-01/data/mutate/${SANITY_DATASET}`

/**
 * Creates a Sanity client instance with helper methods
 * @returns {Object} Client with mutateGuides and createGuide methods
 */
export function createSanityClient() {
  /**
   * Execute a mutation against Sanity's HTTP API
   * @param {Object} mutations - Sanity mutations object
   * @returns {Promise<Object>} Sanity API response
   */
  async function mutate(mutations) {
    const response = await fetch(SANITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SANITY_WRITE_TOKEN}`
      },
      body: JSON.stringify({ mutations })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Sanity API error (${response.status}): ${error}`)
    }

    return response.json()
  }

  /**
   * Query Sanity to resolve place slugs to document IDs
   * @param {string[]} placeSlugs - Array of place slugs
   * @returns {Promise<Array>} Array of place document references
   */
  async function resolvePlaceSlugs(placeSlugs) {
    if (!placeSlugs || placeSlugs.length === 0) {
      return []
    }

    // Build GROQ query to find places by slug
    const slugsQuery = placeSlugs.map(slug => `"${slug}"`).join(', ')
    const query = `*[_type == "place" && slug.current in [${slugsQuery}]]{_id, slug}`
    const encodedQuery = encodeURIComponent(query)

    const queryUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-08-01/data/query/${SANITY_DATASET}?query=${encodedQuery}`

    const response = await fetch(queryUrl, {
      headers: {
        'Authorization': `Bearer ${SANITY_WRITE_TOKEN}`
      }
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Sanity query error (${response.status}): ${error}`)
    }

    const { result } = await response.json()

    // Return array of references
    return result.map(place => ({
      _type: 'reference',
      _ref: place._id
    }))
  }

  /**
   * Query Sanity to resolve neighborhood slugs to document IDs
   * @param {string[]} neighborhoodSlugs - Array of neighborhood slugs
   * @returns {Promise<Array>} Array of neighborhood document references
   */
  async function resolveNeighborhoodSlugs(neighborhoodSlugs) {
    if (!neighborhoodSlugs || neighborhoodSlugs.length === 0) {
      return []
    }

    const slugsQuery = neighborhoodSlugs.map(slug => `"${slug}"`).join(', ')
    const query = `*[_type == "neighborhood" && slug.current in [${slugsQuery}]]{_id, slug}`
    const encodedQuery = encodeURIComponent(query)

    const queryUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-08-01/data/query/${SANITY_DATASET}?query=${encodedQuery}`

    const response = await fetch(queryUrl, {
      headers: {
        'Authorization': `Bearer ${SANITY_WRITE_TOKEN}`
      }
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Sanity query error (${response.status}): ${error}`)
    }

    const { result } = await response.json()

    return result.map(neighborhood => ({
      _type: 'reference',
      _ref: neighborhood._id
    }))
  }

  /**
   * Create a single guide document
   * @param {Object} guidePayload - Guide data
   * @param {string} guidePayload.title - Guide title
   * @param {Object} guidePayload.slug - Slug object {_type: "slug", current: "..."}
   * @param {string} guidePayload.summary - Guide summary
   * @param {Array} guidePayload.content - Portable text content blocks
   * @param {string} guidePayload.guideType - Guide type (list, explainer, etc.)
   * @param {string[]} [guidePayload.placeSlugs] - Optional array of place slugs to resolve
   * @param {string[]} [guidePayload.neighborhoodSlugs] - Optional array of neighborhood slugs to resolve
   * @param {Array} [guidePayload.places] - Optional pre-resolved place references
   * @param {Array} [guidePayload.neighborhoods] - Optional pre-resolved neighborhood references
   * @returns {Promise<Object>} Created guide document
   */
  async function createGuide(guidePayload) {
    const {
      title,
      slug,
      summary,
      content,
      guideType,
      placeSlugs = [],
      neighborhoodSlugs = [],
      places: providedPlaces,
      neighborhoods: providedNeighborhoods
    } = guidePayload

    // Resolve place slugs if provided
    let places = providedPlaces || []
    if (placeSlugs.length > 0) {
      places = await resolvePlaceSlugs(placeSlugs)
    }

    // Resolve neighborhood slugs if provided
    let neighborhoods = providedNeighborhoods || []
    if (neighborhoodSlugs.length > 0) {
      neighborhoods = await resolveNeighborhoodSlugs(neighborhoodSlugs)
    }

    // Build the mutation
    const mutation = {
      create: {
        _type: 'guide',
        title,
        slug,
        summary,
        content: content || [],
        guideType,
        ...(places.length > 0 && { places }),
        ...(neighborhoods.length > 0 && { neighborhoods })
      }
    }

    const result = await mutate([mutation])

    return {
      ...mutation.create,
      _id: result.results[0]?.id || result.transactionId
    }
  }

  /**
   * Batch create multiple guides
   * @param {Array<Object>} guides - Array of guide payloads
   * @returns {Promise<Object>} Sanity API response
   */
  async function mutateGuides(guides) {
    const mutations = guides.map(guide => ({
      create: {
        _type: 'guide',
        ...guide
      }
    }))

    return mutate(mutations)
  }

  return {
    mutate,
    createGuide,
    mutateGuides,
    resolvePlaceSlugs,
    resolveNeighborhoodSlugs
  }
}

// Export singleton instance for convenience
export const sanityClient = createSanityClient()

