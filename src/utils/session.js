export const isLogged = () => {
  return(localStorage.getItem("account") != null)
}
