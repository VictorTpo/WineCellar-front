export const wineCellarsCount = () => {
  if(!localStorage.getItem("wine_cellars")) return 0
  return Object.keys(JSON.parse(localStorage.getItem("wine_cellars"))).length
}

export const wineCellarsList = () => {
  if(!localStorage.getItem("wine_cellars")) return []
  return Object.values(JSON.parse(localStorage.getItem("wine_cellars")))
}

export const wineCellarsFind = (id) => {
  if(!localStorage.getItem("wine_cellars")) return []
  return JSON.parse(localStorage.getItem("wine_cellars"))[id]
}

export const wineCellarsUpdate = (id, payload) => {
  // console.log('wineCellarsUpdate - id', id)
  // console.log('wineCellarsUpdate - payload', payload)
  const updatedWineCellars = JSON.parse(localStorage.getItem("wine_cellars"))
  Object.keys(payload).forEach(key => {
    if(key === 'id') { return }
    // console.log('key', key)
    // console.log('BEFORE updatedWineCellars[id][key]', updatedWineCellars[id][key])
    updatedWineCellars[id][key] = payload[key]
    // console.log('AFTER updatedWineCellars[id][key]', updatedWineCellars[id][key])
  })
  localStorage.setItem("wine_cellars", JSON.stringify(updatedWineCellars))
}
