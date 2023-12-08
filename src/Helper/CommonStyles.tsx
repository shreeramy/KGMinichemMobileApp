import Color from './Color'
import { StyleSheet } from 'react-native'

const CommonStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12
  },
  shadow1: {},
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  padding: {
    padding: 0,
    backgroundColor: Color.white
  },
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  }
})

export default CommonStyles
