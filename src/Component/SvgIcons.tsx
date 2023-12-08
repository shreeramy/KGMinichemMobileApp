import React from 'react'

interface Props {
  Icon: any;
  onPress(): any;
  height?: number;
  width?: number;
}

export const SvgIcon: React.FC<Props> = ({ Icon, onPress, height, width }) => {
  return <Icon onPress={onPress} height={height} width={width} />
}

SvgIcon.defaultProps = {
  height: 30,
  width: 30
}
