import React from 'react';

import {
  AppRegistry,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  Button,
  TouchableOpacity
} from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'
const {height} = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
}
 
export class SliderSample extends React.Component {
  state = {
    visible: false
  }
 
  render() {
    return (
      <View style={styles.container}>
        <SlidingUpPanel
          ref={c => this._panel = c}
          visible={this.state.visible}
          onRequestClose={() => this.setState({visible: false})}>
          <View style={styles.container}>
            <Text>Here is the content inside panel</Text>
            <Button title='hide' onPress={() => this._panel.transitionTo(0)} />
          </View>
        </SlidingUpPanel>
        <TouchableOpacity onPress={() => this.setState({visible: true})}>
          <Text>Show panel</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export class BottomSheet extends React.Component {
  static defaultProps = {
    draggableRange: {
      top: height / 1.5,
      bottom: 120
    }
  }

  _draggedValue = new Animated.Value(-120)

  constructor(props) {
    super(props)

    this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this)
  }

  _renderFavoriteIcon() {
    const {top, bottom} = this.props.draggableRange
    const draggedValue = this._draggedValue.interpolate({
      inputRange: [-(top + bottom) / 2, -bottom],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const transform = [{scale: draggedValue}]

    return (
      <Animated.View style={[styles.favoriteIcon, {transform}]}>
        <Image source={require('../../assets/chats-icon.png')} style={{width: 32, height: 32}} />
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Bolo zubaan kesari</Text>
        <SlidingUpPanel
          visible
          showBackdrop={false}
          ref={(c) => {this._panel = c}}
          draggableRange={this.props.draggableRange}
          onDrag={(v) => this._draggedValue.setValue(v)}>
          <View style={styles.panel}>
            {this._renderFavoriteIcon()}
            <View style={styles.panelHeader}>
              <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
            </View>
            <View style={styles.container}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    )
  }
}