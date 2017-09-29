import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import {
  StackNavigator,
  TabNavigator,
  TabBarBottom 
} from "react-navigation";

export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ margin: 20 }}>
          <Text>Hello, Chat App!</Text>
          <View style={{ marginTop: 20 }}>
            <Button
              onPress={() => navigate('Chat', { user: 'Lucy' })}
              title="Chat with Lucy"
            />
          </View>
        </View>
      </View>
    );
  }
}

export class ChatScreen extends Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.generalContainer}>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

export class RecentChatsScreen extends Component {
  render() {
    return (
      <View style={styles.generalContainer}>
        <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text>List of recent chats</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', marginTop: 20 }}>
          <Button
            onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
            title="Chat with Lucy" />
        </View>
      </View>
    )
  }
}

export class AllContactsScreen extends Component {
  render() {
    return (
      <View style={styles.generalContainer}>
        <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text>List of all contacts</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', marginTop: 20 }}>
          <Button
            onPress={() => this.props.navigation.navigate('Chat', { user: 'Jane' })}
            title="Chat with Jane" />
        </View>
      </View>
    )
  }
}

export const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
},
  {
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: {
        style: {
          margin: 10,          
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'pink',
        },
      },
  }
);

MainScreenNavigator.navigationOptions = {
  title: 'My Chats',
};

// const MainScreenNavigator = TabNavigator({
//   Recent: { screen: RecentChatsScreen },
//   All: { screen: AllContactsScreen },
// });

// MainScreenNavigator.navigationOptions = {
//   title: 'My Chats',
// };

// export const SimpleApp = StackNavigator({
//   Home: { screen: MainScreenNavigator },
//   Chat: { screen: ChatScreen },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  generalContainer: {
    flex: 2,
    //alignItems: 'center',
    //justifyContent: 'center',    
    backgroundColor: '#F5FCFF',
    margin: 20
  },
});