import { sanitize } from '../../../main/ts/core/Tools'

describe('sanitize', () => {
  it('returns null when input is null', () => {
    expect(sanitize(null)).toBeNull()
  })

  it('returns empty string when input is empty', () => {
    expect(sanitize('')).toBe('')
  })

  it('does not modify a safe string', () => {
    const text = 'Hello world 123'
    expect(sanitize(text)).toBe(text)
  })

  it('escapes ampersand', () => {
    expect(sanitize('&')).toBe('&amp;')
  })

  it('escapes less than', () => {
    expect(sanitize('<')).toBe('&lt;')
  })

  it('escapes greater than', () => {
    expect(sanitize('>')).toBe('&gt;')
  })

  it('escapes double quotes', () => {
    expect(sanitize('"')).toBe('&quot;')
  })

  it('escapes single quotes', () => {
    expect(sanitize("'")).toBe('&#39;')
  })

  it('escapes slash', () => {
    expect(sanitize('/')).toBe('&#x2F;')
  })

  it('escapes multiple characters in the same string', () => {
    const text = `<script>alert("xss")</script>`
    expect(sanitize(text)).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
    )
  })

  it('escapes characters appearing multiple times', () => {
    expect(sanitize('&&&&')).toBe('&amp;&amp;&amp;&amp;')
  })
})
