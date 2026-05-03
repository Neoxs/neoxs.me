import path from 'path'
import { getAllPosts, getPostBySlug } from './blog'

const FIXTURES = path.resolve(__dirname, '__fixtures__/blog')

describe('getAllPosts', () => {
  test('returns all posts from the directory', () => {
    const posts = getAllPosts(FIXTURES)
    expect(posts).toHaveLength(2)
  })

  test('parses title and description from frontmatter', () => {
    const posts = getAllPosts(FIXTURES)
    const titles = posts.map(p => p.title)
    expect(titles).toContain('Newer Post')
    expect(titles).toContain('Older Post')
  })

  test('sorts posts newest-first by date', () => {
    const posts = getAllPosts(FIXTURES)
    expect(posts[0].title).toBe('Newer Post')
    expect(posts[1].title).toBe('Older Post')
  })

  test('defaults tags to [] when frontmatter has none', () => {
    const posts = getAllPosts(FIXTURES)
    const older = posts.find(p => p.slug === 'older-post')!
    expect(older.tags).toEqual([])
  })

  test('parses tags array from frontmatter', () => {
    const posts = getAllPosts(FIXTURES)
    const newer = posts.find(p => p.slug === 'newer-post')!
    expect(newer.tags).toEqual(['react', 'architecture'])
  })

  test('uses filename without extension as slug', () => {
    const slugs = getAllPosts(FIXTURES).map(p => p.slug)
    expect(slugs).toContain('newer-post')
    expect(slugs).toContain('older-post')
  })

  test('returns [] when the directory does not exist', () => {
    expect(getAllPosts('/tmp/does-not-exist-xyz')).toEqual([])
  })
})

describe('getPostBySlug', () => {
  test('returns the matching post', () => {
    const post = getPostBySlug('newer-post', FIXTURES)
    expect(post?.title).toBe('Newer Post')
  })

  test('returns undefined for an unknown slug', () => {
    expect(getPostBySlug('ghost-post', FIXTURES)).toBeUndefined()
  })
})
