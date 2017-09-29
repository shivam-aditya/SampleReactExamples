import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet
} from 'react-native';

import {
  Card,
  CardItem,
} from 'native-base';

export default class RobotItem extends Component {
  constructor(props) {
    super(props);

    this.recordContent = this.props.record.content;
  }

  render() {
    return (
      <Card style={[styles.cardContainer, this.props.style]}>
        <CardItem>
          <Text>{this.recordContent.title}</Text>
        </CardItem>
        <CardItem>
          <Image style={{resizeMode: 'cover', height:100, width:100}} source={{uri: this.recordContent.image}} />
        </CardItem>
        <CardItem>
          <Text>{this.recordContent.description}</Text>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10
  }
});
