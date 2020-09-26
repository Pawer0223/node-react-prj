
export function getHashValues(hash) {
  console.log('here 2')
  console.log(hash)
  return Object.values(hash) // needs modern browser
}

export function hashById(array) {
  let hash = {}

  for (let item of array) {
    hash[item.id] = item
    console.log(item);
  }

  return hash
}

export function excludeById(array, id) {
  return array.filter((item) => item.id !== id)
}

export function getTodayStr() {
  return new Date().toISOString().replace(/T.*$/, '')
}
