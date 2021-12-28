export const currentAccountFirstName = () => {
  if(!localStorage.getItem("account")) return null
  return JSON.parse(localStorage.getItem("account")).firstName
}

export const currentAccountId = () => {
  if(!localStorage.getItem("account")) return null
  return JSON.parse(localStorage.getItem("account")).id
}

