export function generateId() {
  const date = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2)
  return random + date
}
