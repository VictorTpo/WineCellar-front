export const currentAccountFirstName = () => {
  return JSON.parse(localStorage.getItem("account")).firstName
}

export const currentAccountLastName = () => {
  return JSON.parse(localStorage.getItem("account")).lastName
}

export const currentAccountId = () => {
  return JSON.parse(localStorage.getItem("account")).id
}
