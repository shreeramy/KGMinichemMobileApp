import * as React from 'react'
import { ScrollView } from 'react-native'

interface appScrollviewProps {
  children: any;
  style?: any;
}

const AppScrollview = (props: appScrollviewProps) => {
  const { children, style } = props
  return (
    <ScrollView
      style={style}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  )
}

export default AppScrollview
