export const currentAccountFirstName = () => {
  if(!localStorage.getItem("account")) return null
  return JSON.parse(localStorage.getItem("account")).firstName
}

export const currentAccountLastName = () => {
  if(!localStorage.getItem("account")) return null
  return JSON.parse(localStorage.getItem("account")).lastName
}

export const currentAccountId = () => {
  if(!localStorage.getItem("account")) return null
  return JSON.parse(localStorage.getItem("account")).id
}

export const currentAccountJwtToken = () => {
  if(!localStorage.getItem("account")) return null
  return JSON.parse(localStorage.getItem("account")).jwtToken
}
