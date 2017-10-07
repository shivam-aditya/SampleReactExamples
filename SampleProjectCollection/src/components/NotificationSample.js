import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, AppState, Platform, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Reactotron from 'reactotron-react-native';

class PushController extends Component {
    componentDidMount() {
        PushNotification.configure({
            onNotification: function (notification) {
                Reactotron.log('NOTIFICATION:', notification);
            },
        });
    }

    render() {
        return null;
    }
}

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
  picker: {
    width: 100,
  },
});

export default class NotificationSample extends Component {
  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      seconds: 5,
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    //AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    //AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    //Reactotron.log('handleAppStateChange called! isNotificationEnabled is: ' + this.state.isNotificationEnabled);    
    // if (appState === 'background' && this.state.isNotificationEnabled === 1) {
      if (appState === 'background') {        
      let date = new Date(Date.now() + (this.state.seconds * 1000));

      if (Platform.OS === 'ios') {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date,
      });
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      Reactotron.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  SendNotificationNow() {
    Reactotron.log('SendNotificationNow called!');                
    let date = new Date(Date.now());

    if (Platform.OS === 'ios') {
      date = date.toISOString();
    }

    PushNotification.localNotificationSchedule({
      message: "Sample Notification Message",
      date,
    });
  }

  EnableDelayedBackgroundNotification() {
    //this.setState({isNotificationEnabled: 1});
    //Reactotron.log('EnableDelayedBackgroundNotification called! isNotificationEnabled is: ' + this.state.isNotificationEnabled);            
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  DisableDelayedBackgroundNotification() {
    //this.setState({isNotificationEnabled: 0}); 
    //Reactotron.log('DisableDelayedBackgroundNotification called! isNotificationEnabled is: ' + this.state.isNotificationEnabled);                
    AppState.removeEventListener('change', this.handleAppStateChange);
    }

  CheckBackgroundNotification() {
    Reactotron.log('CheckBackgroundNotification called! isNotificationEnabled is: ' + this.state.isNotificationEnabled);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Choose your notification time in seconds.
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={(seconds) => this.setState({ seconds })}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
        </Picker>
        <View style={{ margin: 20 }}>
          <Button
            onPress={() => this.EnableDelayedBackgroundNotification()}
            title="Enable delayed background Notification"
          />
        </View>
        <View style={{ margin: 20 }}>
          <Button
            onPress={() => this.SendNotificationNow()}
            title="Send Notification Now"
          />
        </View>
        <PushController />
      </View>
    );
  }
}

