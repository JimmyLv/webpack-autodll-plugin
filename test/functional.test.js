import { runWebpackExampleInMemory } from './test-utils'

test('should run with no errors or warnings', async () => {
  const buildStats = await runWebpackExampleInMemory('simple')
  const { errors, warnings } = buildStats
  if ([...errors, ...warnings].length > 0) {
    console.log({ errors, warnings })
  }
  expect([...errors, ...warnings].length).toBe(0)
})
