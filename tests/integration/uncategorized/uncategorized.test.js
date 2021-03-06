import { resolve } from 'path'
import fetch from 'node-fetch'
import { joinUrl, setup, teardown } from '../_testHelpers/index.js'

jest.setTimeout(30000)

describe('uncategorized tests', () => {
  // init
  beforeAll(() =>
    setup({
      servicePath: resolve(__dirname),
    }),
  )

  // cleanup
  afterAll(() => teardown())

  // issue: https://github.com/dherault/serverless-offline/issues/756
  // PR: https://github.com/dherault/serverless-offline/pull/757
  test('Uncategorized 1', async () => {
    const url = joinUrl(TEST_BASE_URL, '/dev/uncategorized-1')
    const response = await fetch(url)
    const json = await response.json()

    expect(json).toEqual({ foo: 'bar' })
  })

  // issue: https://github.com/dherault/serverless-offline/issues/758
  // PR: https://github.com/dherault/serverless-offline/pull/759
  test('Uncategorized 2', async () => {
    const url = joinUrl(TEST_BASE_URL, '/dev/uncategorized-2')
    const response = await fetch(url)
    const json = await response.json()

    expect(json).toEqual({ foo: 'bar' })
  })
})

describe('noPrependStageInUrl tests', () => {
  // init
  beforeAll(() =>
    setup({
      servicePath: resolve(__dirname),
      args: ['--noPrependStageInUrl'],
    }),
  )

  // cleanup
  afterAll(() => teardown())

  test('noPrependStageInUrl 1', async () => {
    const url = joinUrl(TEST_BASE_URL, '/uncategorized-1')
    const response = await fetch(url)
    const json = await response.json()

    expect(json).toEqual({ foo: 'bar' })
  })

  test('noPrependStageInUrl 2', async () => {
    const url = joinUrl(TEST_BASE_URL, '/dev/uncategorized-1')
    const response = await fetch(url)
    const json = await response.json()

    expect(json.statusCode).toEqual(404)
  })
})

describe('prefix options', () => {
  // init
  beforeAll(() =>
    setup({
      servicePath: resolve(__dirname),
      args: ['--prefix', 'someprefix'],
    }),
  )

  // cleanup
  afterAll(() => teardown())

  describe('when the prefix option is used', () => {
    test('the prefixed path should return a payload', async () => {
      const url = joinUrl(TEST_BASE_URL, '/someprefix/dev/uncategorized-1')
      const response = await fetch(url)
      const json = await response.json()

      expect(json).toEqual({ foo: 'bar' })
    })
  })
})
