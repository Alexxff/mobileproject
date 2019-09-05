export const setItem = (key, item) => {
  // item 如果setItem是对象,则转换成字符串
//   if (item instanceof Object) {
//     item = JSON.stringify(item)
//   }
  window.localStorage.setItem(key, JSON.stringify(item))
}

export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
