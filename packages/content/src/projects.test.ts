import path from 'path'
import { getAllProjects, getProjectBySlug } from './projects'

const FIXTURES = path.resolve(__dirname, '__fixtures__/projects')

describe('getAllProjects', () => {
  test('returns all projects from the directory', () => {
    expect(getAllProjects(FIXTURES)).toHaveLength(2)
  })

  test('parses title and description from frontmatter', () => {
    const titles = getAllProjects(FIXTURES).map(p => p.title)
    expect(titles).toContain('Featured Project')
    expect(titles).toContain('Normal Project')
  })

  test('sorts featured projects first', () => {
    const projects = getAllProjects(FIXTURES)
    expect(projects[0].title).toBe('Featured Project')
    expect(projects[1].title).toBe('Normal Project')
  })

  test('defaults featured to false when omitted', () => {
    const projects = getAllProjects(FIXTURES)
    const normal = projects.find(p => p.slug === 'normal-project')!
    expect(normal.featured).toBe(false)
  })

  test('defaults tags to [] when omitted', () => {
    const projects = getAllProjects(FIXTURES)
    const normal = projects.find(p => p.slug === 'normal-project')!
    expect(normal.tags).toEqual([])
  })

  test('parses optional live URL', () => {
    const featured = getAllProjects(FIXTURES).find(p => p.slug === 'featured-project')!
    expect(featured.live).toBe('https://example.com')
  })

  test('returns [] when the directory does not exist', () => {
    expect(getAllProjects('/tmp/does-not-exist-xyz')).toEqual([])
  })
})

describe('getProjectBySlug', () => {
  test('returns the matching project', () => {
    const p = getProjectBySlug('featured-project', FIXTURES)
    expect(p?.title).toBe('Featured Project')
  })

  test('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('ghost-project', FIXTURES)).toBeUndefined()
  })
})
