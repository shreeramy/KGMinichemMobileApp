import React from 'react'
import { View, StyleSheet } from 'react-native'

interface seperateInterface {
  showLine?: boolean;
}

export default function RenderSeperator(props: seperateInterface) {
  const { showLine } = props
  return <View style={[showLine ? styles.seperator : styles.seperator_hight]} />
}

RenderSeperator.defaultProps = {
  showLine: false
}
const styles = StyleSheet.create({
  seperator: {
    width: '100%',
    borderWidth: 0.3
  },
  seperator_hight: {
    width: '100%',
    height: 10
  }
})
