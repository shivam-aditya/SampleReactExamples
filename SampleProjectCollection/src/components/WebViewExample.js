import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native';

import { 
  WebView, 
  StyleSheet, 
  View,
  ActivityIndicator
} from 'react-native';

export class MyWebViewDefault extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={styles.container}
      />
    );
  }
}

export class MyWebViewCustomUrl extends Component {
  constructor(props) {
    super(props);
  }

  _onLoadStart() {
    Reactotron.log("_onLoadStart called");
    this.setState({ webViewLoading: true });
  }

  _onLoadEnd() {
    Reactotron.log("_onLoadEnd called");
    this.setState({ webViewLoading: false, webviewLoaded: true });
  }

  _onLoad() {
    Reactotron.log("_onLoad called");
    this.setState({ webViewLoading: false, webviewLoaded: true });
  }

  _onMessage(data) {
    //Prints out data that was passed.
    console.log(data);
  }


  _onMessage(data) {
    //Prints out data that was passed.
    console.log(data);
  }

  renderLoading()
  {
    return (
      // <ActivityIndicator/>
      <View style={{ paddingTop: 200, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <WebView
        source={{ uri: params.url }}
        renderLoading={this.renderLoading}
        startInLoadingState={true}
        onMessage={this._onMessage}
      />
      // <WebView
      //   onLoadStart={this._onLoadStart.bind(this)}
      //   onLoadEnd={this._onLoadEnd.bind(this)}
      //   onLoad={this._onLoad}
      //   onMessage={this._onMessage}
      //   source={{ uri: params.url }}
      //   style={styles.container}
      //   startInLoadingState={true}
      // />
    );
  }
}

export class MyWebViewFromHtml extends Component {
    constructor(props){
        super(props);
    }

  render() {    
    return (
      <WebView
        source={{html: this.props.html}}
        style={styles.containerAllSides}
        />
      // <View>
      //   {this.renderSpinner()}
      //   <WebView onLoad={this.onWebLoad.bind(this)}
      //     source={{ html: this.props.html }}
      //     style={styles.containerAllSides}
      //     scalesPageToFit={true}
      //   />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    containerAllSides: {
      margin: 5
  }
});