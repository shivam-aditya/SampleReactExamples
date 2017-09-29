import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import {
  StackNavigator,
  TabNavigator
} from "react-navigation";

import {
  Header,
  Container,
  Title,
  Content,
  Card,
  CardItem,
  Spinner  
} from 'native-base';

import Dataset from 'impagination';

export default class robotImpagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: null,
      datasetState: null,
    };
  }
  setupImpagination() {
    let dataset = new Dataset({
      pageSize: 15,
      loadHorizon: 15,
      
      // Anytime there's a new state emitted, we want to set that on
      // the componets local state.
      observe: (datasetState) => {
        this.setState({ datasetState });
      },
      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://serene-beach-38011.herokuapp.com/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
          });
      }
    });
    // Set the readOffset to the first record in the state
    dataset.setReadOffset(0);
    this.setState({ dataset });
  }

  componentWillMount() {
    this.setupImpagination();
  }

  renderItem() {
    return this.state.datasetState.map(record => {
      if (!record.isSettled) {
        return <Spinner key={Math.random()} />;
      }
      return (
        <Card style={{ margin: 10 }}>
          <CardItem>
            <Text>{record.content.title}</Text>
          </CardItem>
          <CardItem>
            <Image style={{ resizeMode: 'cover', height: 100, width: 100 }} source={{ uri: record.content.image }} />
          </CardItem>
          <CardItem>
            <Text>{record.content.description}</Text>
          </CardItem>
        </Card>
      );
    });
  }


/**
   * Based on scroll position determine which card is in the current
   * viewport. From there you can set the impagination readOffset
   * equal to the current visibile card.
   *
   * @method setCurrentReadOffset
   */
  setCurrentReadOffset = (event) => {
    // let itemHeight = 402;
    let itemHeight = 220;    
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    console.log('current scroll position of the list in pixels'+currentOffset);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);

    this.state.dataset.setReadOffset(currentItemIndex);
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Impagination.js</Title>
        </Header>
        <Content horizontal={true} scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>
          {this.renderItem()}
        </Content>
      </Container>
    );
  }
}


