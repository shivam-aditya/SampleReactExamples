import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet
  } from 'react-native'

import Swiper from 'react-native-swiper'
import randomcolor from 'randomcolor'

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

class TitleText extends Component {
  render() {
    return (
      <Text style={{ fontSize: 48, color: 'white' }}>
        {this.props.label}
      </Text>
    )
  }
}

export default class SnapchatSliderHome extends Component {

  viewStyle() {
    return {
      flex: 1,
      backgroundColor: randomcolor(),
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  render() {
    return (
    //   <Swiper
    //     loop={false}
    //     showsPagination={false}
    //     index={1}>
    //     <View style={this.viewStyle()}>
    //       <TitleText label="Left" />
    //     </View>
    //     <Swiper
    //       horizontal={false}
    //       loop={false}
    //       showsPagination={false}
    //       index={1}>
    //       <View style={this.viewStyle()}>
    //         <TitleText label="Top" />
    //       </View>
    //       <View style={this.viewStyle()}>
    //         <TitleText label="Home" />
    //       </View>
    //       <View style={this.viewStyle()}>
    //         <TitleText label="Bottom" />
    //       </View>
    //     </Swiper>        
    //     <View style={this.viewStyle()}>
    //       <TitleText label="Right" />
    //     </View>
    //   </Swiper>
        <Swiper
            loop={false}
            showsPagination={false}
            showsButtons={true}
            index={1}>
            <View style={this.viewStyle()}>
                <TitleText label="Top" />
            </View>
            <View style={this.viewStyle()}>
                <TitleText label="Home" />
            </View>
            <View style={this.viewStyle()}>
                <TitleText label="Bottom" />
            </View>
        </Swiper>
    )
  }
}