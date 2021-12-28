export const sessionIsLogged = () => {
  return(localStorage.getItem("token") != null)
}

export const sessionToken = () => {
  return localStorage.getItem("token")
}
