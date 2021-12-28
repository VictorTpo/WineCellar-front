import { sessionToken } from "./session"

export const headers = () => {
  return({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionToken()}`
  })
}

export const queryBuilder = (method, body) => {
  return({
    method: method,
    headers: headers(),
    body: JSON.stringify(body)
  })
}
