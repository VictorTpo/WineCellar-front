const account = JSON.parse(localStorage.getItem("account"))

export const currentAccountFirstName = () => {
  if(!localStorage.getItem("account")) return null
  return account.firstName
}

export const currentAccountId = () => {
  if(!localStorage.getItem("account")) return null
  return account.id
}

