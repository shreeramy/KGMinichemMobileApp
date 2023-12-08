import AsyncStorage from '@react-native-async-storage/async-storage'

const local_global: any = global

const setUserData = async (userData: any) => {
  try {
    local_global.userData = userData
    await AsyncStorage.setItem('@userData', JSON.stringify(userData))
  } catch (e) {
    throw new Error()
  }
}

const getUserData = () => {
  return new Promise((resolve) => {
    try {
      AsyncStorage.getItem('@userData')
        .then((value) => {
          if (value !== null) {
            local_global.userData = JSON.parse(value)
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch(() => resolve(false))
    } catch (e) {
      resolve(false)
      throw new Error()
    }
  })
}

const setToken = async (userToken: any) => {
  try {
    await AsyncStorage.setItem('@userToken', JSON.stringify(userToken))
  } catch (e) {
    throw new Error()
  }
}

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@userToken')
    if (value !== null) {
      return value
    }
    return null
  } catch (e) {
    throw new Error()
  }
}

const logout = async () => {
  try {
    local_global.userData = null
    AsyncStorage.removeItem('@userData')
    AsyncStorage.removeItem('@userToken')
  } catch (e) {
    throw new Error()
  }
}

const Storage = {
  setToken,
  getToken,
  setUserData,
  getUserData,
  logout
}

export default Storage
