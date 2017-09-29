import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Alert
} from 'react-native';

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
import DropdownAlert from 'react-native-dropdownalert';

const MAIN_CUSTOM_COLOR = '#6441A4'

export default class buzzhome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataset: null,
            datasetState: null,
        };
    }

    /**
   * Create a new impagination dataset when the component mounts and
   * set the intial readOffset to 0 to fetch data.
   *
   * @method setupImpagination
   */
    setupImpagination() {
        let dataset = new Dataset({
            pageSize: 10,
            loadHorizon: 10,

            // Anytime there's a new state emitted, we want to set that on
            // the componets local state.
            observe: (datasetState) => {
                this.setState({ datasetState });
            },

            // Where to fetch the data from.
            fetch(pageOffset, pageSize, stats) {
                itemNumber = (pageOffset) * 10;
                //http://origin-ro-api-dhtv.dailyhunt.in/v2/group/items/tren?appLanguage=en&langCode=en,hi&count=10&start=0
                url = "http://origin-ro-api-dhtv.dailyhunt.in/v2/group/items/tren?appLanguage=en&langCode=en,hi&count=" + pageSize + "&start=" + (itemNumber + 1);
                console.log("Item number is :" + itemNumber + " and url is: " + url);
                return fetch(url)
                    .then(response => {
                        console.log("Response code is: " + response.status);
                        return response.json()
                    })
                    .then((responseJson) => {
                        return responseJson.data.rows;
                    })
                    .catch((error) => {
                        console.log("error found");
                        console.error(error);
                    });
            }
        });

        // Set the readOffset to the first record in the state
        dataset.setReadOffset(0);
        this.setState({ dataset });
    }

    componentWillMount() {
        console.log(this);
        this.setupImpagination();
    }

    renderItem() {
        return this.state.datasetState.map((item, index) => {
            //console.log("Record came. Index is " + index);
            var imageURL = 'http://i3.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large';
            if (item !== undefined &&
                item != null &&
                item.content !== undefined &&
                item.content != null) {
                var str = item.content.shareImageUrl;
                str = str.replace('{0}', 'xl');
                imageURL = str.replace('{1}', 'h');
                //console.log("imageURL is " + imageURL);
            }
            //   else {
            //       console.log("item is null");
            //   }

            if (item.isPending && !item.isSettled) {
                return <Spinner color="#00C497" key={Math.random()} />;
            }

            if (item !== undefined &&
                item != null &&
                item.content !== undefined &&
                item.content != null) {
                //console.log("item title is: "+item.content.title);
                //console.log("item content id is: "+item.content.id);

                return (
                    // <TouchableHighlight onPress={this.onItemTap}>
                    <TouchableHighlight onPress={() => this.onItemTap(item.content.shareUrl)}>
                        <Card style={{ height: 150, width: 300 }}>
                            <CardItem>
                                <Text>{item.content.title}</Text>
                            </CardItem>
                            <CardItem>
                                <Image style={{ resizeMode: 'cover', height: 100, width: 200 }} source={{ uri: imageURL, cache: 'default' }} />
                            </CardItem>
                            <CardItem>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ resizeMode: 'stretch', height: 30, width: 40 }}
                                        source={require('../.././assets/unlike.jpeg')} />
                                    <View style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>{item.content.like.count}</Text>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                    </TouchableHighlight>
                );
            }
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
        //let itemHeight = 220;
        let itemWidth = 300;        
        //let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
        let currentOffset = Math.floor(event.nativeEvent.contentOffset.x);
        //console.log('current scroll position of the list in pixels'+currentOffset);
        //let currentItemIndex = Math.ceil(currentOffset / itemHeight);
        let currentItemIndex = Math.ceil(currentOffset / itemWidth);
        //console.log('currentItemIndex of the list in pixels'+currentItemIndex);
        this.state.dataset.setReadOffset(currentItemIndex);
    }

    render() {
        return (
            <Container>
                {/* <Header style={{alignItems: 'center', justifyContent: 'center' }}>
                    <Title>Buzz Home</Title>
                </Header> */}
                <Content horizontal={true} scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>
                    {this.renderItem()}
                </Content>
                {/* <DropdownAlert
                    ref={(ref) => this.dropdown = ref}
                    onClose={(data) => this.onClose(data)} /> */}
            </Container>
        );
    }

    _onPressButton() {
        Alert.alert('You tapped the button!');
    }

    onItemTap(shareUrl) {
        this.props.navigation.navigate('WebViewCustomUrl', { url: shareUrl})
        //Alert.alert('You tapped the button! share url is:'+shareUrl);
        //this.dropdown.alertWithType("item.type", "title", "item.message");
    }


    onClose(data) {
        console.log(data);
        // data = {type, title, message, action} 
        // action means how the alert was dismissed. returns: automatic, programmatic, tap, pan or cancel 
    }
}



