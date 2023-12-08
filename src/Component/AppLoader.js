import React, { PureComponent } from 'react'
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import { Color } from '../Helper'

export class AppLoader extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  showLoader = (isLoading) => {
    this.setState({ isLoading })
  }

  render() {
    const { isLoading } = this.state
    const { isVisible, onRequestClose } = this.props
    return (
      <Modal
        animationType={'fade'}
        visible={isVisible || isLoading}
        transparent
        onRequestClose={onRequestClose}
      >
        <View style={styles.container}>
          <View style={styles.loader}>
            <ActivityIndicator size={'large'} color={'green'} />
          </View>
        </View>
      </Modal>
    )
  }
}

export default AppLoader

AppLoader.defaultProps = {
  isVisible: false
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(169,169,169,0.5)'
  },
  loader: {
    height: 100,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  }
})
