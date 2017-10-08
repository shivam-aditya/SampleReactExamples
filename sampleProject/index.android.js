/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  ScrollView,
  FlatList,
  SectionList,
  Button,
  ActivityIndicator,
  ListView,
  TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import HttpService from './services/HttpService';

var sampleStylesVar = require('./styles/sampleStyles');

export default class sampleProject2 extends Component {
  render() {
    return (
      <ScrollView>
        <View style={sampleStylesVar.sampleStyles.container}>
          <HttpServiceSample />
          <Movies />
          <StarCount />
          <PizzaTranslator />
          <IntroProject />
          <FixedDimensionsBasics />
          <AlignItemsBasics />
          <ButtonBasics />
          <FlatListBasics />
          <Touchables />
          <SectionListBasics />
        </View>
      </ScrollView>
    );
  }
}

class IntroProject extends Component {
  render() {
    let pic = {
      uri: 'https://www.killping.com/blog/wp-content/uploads/2015/10/dota-2-reborn-lag.jpg'
    };
    return (
      <View style={sampleStylesVar.sampleStyles.containerElement}>
        <Text style={sampleStylesVar.sampleStyles.welcome}>
          Welcome to React Native!{'\n'} Go fuck urself :P
        </Text>
        <Text style={sampleStylesVar.sampleStyles.header}>
          Yo!
        </Text>
        <Text style={sampleStylesVar.sampleStyles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={sampleStylesVar.sampleStyles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Image source={pic} style={{ width: 300, height: 150, margin: 20 }} />
        <View style={{ alignItems: 'center' }}>
          <Greeting name='Rexxar' />
          <Greeting name='Jaina' />
          <Greeting name='Valeera' />
          {/* <View>
          <Blink text='I love to blink' />
        </View> */}
        </View>
      </View>
    );
  }
}

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 5000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

class FixedDimensionsBasics extends Component {
  render() {
    return (
      <View style={sampleStylesVar.sampleStyles.containerElement}>
        <View>
          <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
          <View style={{ width: 100, height: 100, backgroundColor: 'skyblue' }} />
          <View style={{ width: 150, height: 150, backgroundColor: 'steelblue' }} />
        </View>
        {/* <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 2, backgroundColor: 'skyblue'}} />
          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        </View> */}
      </View>
    );
  }
}

class AlignItemsBasics extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
      }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
      </View>
    );
  }
};

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={{ padding: 10, marginTop: 20 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({ text })}
        />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}

class ButtonBasics extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  _onPressForNonPressButton() {
    Alert.alert('Why did you press me, you meanie..')
  }

  render() {
    return (
      <View style={sampleStylesVar.sampleStyles.buttonContainerElement}>
        <View style={sampleStylesVar.sampleStyles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
          />
        </View>
        <View style={sampleStylesVar.sampleStyles.buttonContainer}>
          <Button
            onPress={this._onPressForNonPressButton}
            title="Don't Press Me"
            color="#841584"
          />
        </View>
        <View style={sampleStylesVar.sampleStyles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="This looks great!"
          />
          <Button
            onPress={this._onPressButton}
            title="OK!"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

class Touchables extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }

  render() {
    return (
      <View style={sampleStylesVar.sampleStyles.containerElement}>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={sampleStylesVar.sampleStyles.button}>
            <Text style={sampleStylesVar.sampleStyles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={sampleStylesVar.sampleStyles.button}>
            <Text style={sampleStylesVar.sampleStyles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
          onPress={this._onPressButton}
          background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={sampleStylesVar.sampleStyles.button}>
            <Text style={sampleStylesVar.sampleStyles.buttonText}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
          onPress={this._onPressButton}
        >
          <View style={sampleStylesVar.sampleStyles.button}>
            <Text style={sampleStylesVar.sampleStyles.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={sampleStylesVar.sampleStyles.button}>
            <Text style={sampleStylesVar.sampleStyles.buttonText}>Touchable with Long Press</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class FlatListBasics extends Component {
  render() {
    return (
      <View style={sampleStylesVar.sampleStyles.containerElement}>
        <FlatList
          data={[
            { key: 'Devin' },
            { key: 'Jackson' },
            { key: 'James' },
            { key: 'Joel' },
            { key: 'John' },
            { key: 'Jillian' },
            { key: 'Jimmy' },
            { key: 'Julie' },
          ]}
          renderItem={({ item }) => <Text style={sampleStylesVar.sampleStyles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

class SectionListBasics extends Component {
  render() {
    return (
      <View style={sampleStylesVar.sampleStyles.sectionListContainer}>
        <SectionList
          sections={[
            { title: 'D', data: ['Devin'] },
            { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
          ]}
          renderItem={({ item }) => <Text style={sampleStylesVar.sampleStyles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => <Text style={sampleStylesVar.sampleStyles.sectionHeader}>{section.title}</Text>}
        />
      </View>
    );
  }
}

class HttpServiceSample extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: false, jsonData: '' };
  }

  componentDidMount() {
    console.log('LUL2');
    //getMoviesFromApiAsync();
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('LUL3D');
        console.log('response json is ' + JSON.stringify(responseJson));
        console.log('description is ' + responseJson.description);
        this.setState({
          //jsonData: JSON.stringify(responseJson.movies), 
          jsonData: responseJson.description,
          showText: true
        });
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    console.log('LUL');
    let display = this.state.showText ? this.state.jsonData : 'LUL';
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
      }}>
        <Text>{display}</Text>
      </View>
    );
  }
}

function getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        jsonData: responseJson.movies
      });
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });
}

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    HttpService.getResponseData2('https://facebook.github.io/react-native/movies.json',
      (responseJson) => {
        if (responseJson.movies !== undefined &&
          responseJson.movies != null &&
          responseJson.movies.length > 0) {
          let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.movies),
          }, function () {
            // do something with new state
          });
        }
      },
      (error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.title}, {rowData.releaseYear}</Text>}
        />
      </View>
    );
  }
}

class StarCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      stars: '?'
    }
  }
  componentDidMount() {
    let URL = 'https://api.github.com/repos/facebook/react-native';
    this.fetchDataFromServer(URL);
  }

  fetchDataFromServer(URL) {
    HttpService.getResponseData4(URL,
      (resultData) => {
        if (resultData.stargazers_count !== undefined &&
          resultData.stargazers_count != null) {

          const stars = resultData.stargazers_count;
          console.log('twinkle stars from json is:' + stars);

          if (stars > 0) {
            this.setState({
              isLoading: false,
              stars: stars,
            });
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={sampleStylesVar.sampleStyles.containerElement}>
        <Text style={{ paddingTop: 10, paddingBottom: 20, alignItems: 'center' }}>
          React Native has {this.state.stars} stars
        </Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('sampleProject2', () => sampleProject2);
