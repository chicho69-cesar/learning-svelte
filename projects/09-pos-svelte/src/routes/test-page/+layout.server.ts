import type { LayoutServerLoad } from './$types'

export const load = (() => {
  // +layout.ts
  // console.log('I work on the server the first load, and then the client on every request')

  // +layout.server.ts
  // console.log('This works only in server for every request')
}) satisfies LayoutServerLoad
