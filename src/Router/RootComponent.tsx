import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Loader, Storage } from '../Helper'
import Routes from './Routes'
import FlashMessage from 'react-native-flash-message'

// const loc_global: any = global

const RootComponent = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoader, setLoader] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    setLoader(true)
    Loader.isLoading(true)
    Storage.getUserData()
      .then((response) => {
        if (response) {
          setIsLogin(true)
        } else {
          setIsLogin(false)
        }
      })
      .finally(() => {
        setLoader(false)
        Loader.isLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      {/* {!isLoader && <Routes isLogin={isLogin} />} */}
      <Routes />
      <FlashMessage position="top" />
    </View>
  )
}

export default RootComponent

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
