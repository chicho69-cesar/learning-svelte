import type { PageServerLoad } from './$types'
// export const prerender = true

export const load = (() => {
  // +page.ts
  // console.log('This works on client always, and in the server the first load')

  // +page.server.ts
  // console.log('This works on server only')
}) satisfies PageServerLoad
