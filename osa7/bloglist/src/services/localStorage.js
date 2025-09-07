const getUser = (key) => {
  let foundUser = window.localStorage.getItem(key)
  if (foundUser) {
    return JSON.parse(foundUser)
  }
}

const addUser = (key, user) => {
  window.localStorage.setItem(key, JSON.stringify(user))
}

const removeUser = (key) => {
  window.localStorage.removeItem(key)
}

export default { getUser, addUser, removeUser }
