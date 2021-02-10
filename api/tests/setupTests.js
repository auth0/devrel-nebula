import '@testing-library/jest-dom/extend-expect'
import {startDb, stopDb, deleteTables} from 'jest-dynalite'

import dynamoose from '@api/lib/db'

import {server} from './mock-server'

jest.setTimeout(30000)

// enable API mocking in test runs using the same request handlers
beforeAll(async () => {
  server.listen()
  jest.spyOn(console, 'error').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  await startDb()
})

afterEach(async () => {
  server.resetHandlers()
  jest.clearAllMocks()
  await deleteTables()
})

afterAll(async () => {
  server.close()
  console.error.mockRestore()
  console.warn.mockRestore()
  await stopDb()
})