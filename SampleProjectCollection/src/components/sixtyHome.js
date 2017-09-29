import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    Image,
    TouchableHighlight,
    Alert,
    WebView,
    ScrollView,
} from 'react-native';

import Carousel from 'react-native-looped-carousel';
import Dataset from 'impagination';
//import FastImage from 'react-native-fast-image';
import ProgressiveImage from 'react-native-progressive-image';
import { MyWebViewFromHtml } from './WebViewExample';
import Reactotron from 'reactotron-react-native';
//import Commons from '../CommonUtility';//var x=Commons.IsAndroid();
import HTMLView from 'react-native-htmlview';

import {
    Header,
    Container,
    Title,
    Content,
    Card,
    CardItem,
    Spinner
} from 'native-base';

const MAIN_CUSTOM_COLOR = '#6441A4'

const { width, height } = Dimensions.get('window');

export class CarouselExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: { width, height },
            dataset: null,
            datasetState: null,
        };
    }

    setCarouselRef = (ref) => {
        this.carousel = ref
    }

    getCurrentPage() {
        return this.carousel && this.carousel.getCurrentPage()
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    componentWillMount() {
        console.log(this);
        this.setupImpagination();
    }

    setupImpagination() {
        let dataset = new Dataset({
            pageSize: 10,
            loadHorizon: 5,

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
                    <TouchableHighlight onPress={() => this.onItemTap(item.content.shareUrl)} style={{ height: this.state.size.height, width: this.state.size.width }}>
                        <Card>
                            <CardItem style={{ maxHeight: (95 / 100 * this.state.size.height), maxWidth: (95 / 100 * this.state.size.width) }}>
                                <Text>{item.content.title}</Text>
                            </CardItem>
                            <CardItem>
                                {/* <View> */}
                                {/* <FastImage
                                        style={styles.imageCache}
                                        source={{
                                            uri: imageURL,
                                            priority: FastImage.priority.high,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover} /> */}
                                <ProgressiveImage
                                    thumbnailSource={{ uri: 'http://i.imgur.com/O249H4P.png?bust' + Math.random() }}
                                    imageSource={{ uri: imageURL }}
                                    style={{ flex: 1, height: 100, width: 200, alignItems: 'stretch' }}
                                    imageFadeDuration={2000} />
                                {/* <Image style={styles.image} source={{ uri: imageURL }} /> */}
                                {/* </View> */}
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

    setCurrentReadOffset = (event) => {
        // let itemHeight = 402;
        //let itemHeight = 220;
        let itemWidth = 300;
        //let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
        let currentOffset = Math.floor(event.nativeEvent.contentOffset.x);
        console.log('current scroll position of the list in pixels' + currentOffset);
        //let currentItemIndex = Math.ceil(currentOffset / itemHeight);
        let currentItemIndex = Math.ceil(currentOffset / itemWidth);
        console.log('currentItemIndex of the list in pixels' + currentItemIndex);
        this.state.dataset.setReadOffset(currentItemIndex);
    }

    setReadOffset = (currentItemIndex) => {
        console.log('currentItemIndex of the list is: ' + currentItemIndex);
        this.state.dataset.setReadOffset(currentItemIndex);
    }

    onItemTap(shareUrl) {
        this.props.navigation.navigate('WebViewCustomUrl', { url: shareUrl })
        //Alert.alert('You tapped the button! share url is:'+shareUrl);
        //this.dropdown.alertWithType("item.type", "title", "item.message");
    }

    render() {
        return (
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay={false}
                    pageInfo={true}
                    currentPage={0}
                    bullets={false}
                    onAnimateNextPage={this.setReadOffset}>
                    {/* onAnimateNextPage={(p) => console.log(p)}> */}
                    {this.renderItem()}
                    {/* <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}><Text>1</Text></View>
                    <View style={[{ backgroundColor: 'red' }, this.state.size]}><Text>2</Text></View>
                    <View style={[{ backgroundColor: 'blue' }, this.state.size]}><Text>3</Text></View> */}
                </Carousel>
            </View>
        );
    }
}

export class CarouselExample2 extends Component {
    static navigationOptions = {
        title: `News`,
      };

    constructor(props) {
        super(props);

        this.state = {
            size: { width, height },
            dataset: null,
            datasetState: null,
        };
    }

    setCarouselRef = (ref) => {
        this.carousel = ref
    }

    getCurrentPage() {
        return this.carousel && this.carousel.getCurrentPage()
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    componentWillMount() {
        //console.log(this);
        this.setupImpagination();
    }

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
                realPage = pageOffset + 1;
                itemNumber = (realPage) * 10;
                maxIndex = itemNumber - 1;
                //http://api-news.dailyhunt.in/api/v1/headlines/user/889065839?returnTickers=true&pageNumber=1&pageScrollStart=1506324249000&src=orig&dsSalt=20170925125512127&langCode=en,hi&cpMaxIndex=9&edition=india&pageSize=10&isHome=true&cdn=N&dsOffset=0
                url = "http://api-news.dailyhunt.in/api/v1/headlines/user/889065839?returnTickers=true&pageNumber=" + realPage + "&pageScrollStart=1506324249000&src=orig&dsSalt=20170925125512127&langCode=en,hi&cpMaxIndex=" + maxIndex + "&edition=india&pageSize=" + pageSize + "&isHome=true&cdn=N&dsOffset=0";
                Reactotron.log("Item number is :" + itemNumber + " and url is: " + url);
                return fetch(url)
                    .then(response => {
                        Reactotron.log("Response code is: " + response.status);
                        return response.json()
                    })
                    .then((responseJson) => {
                        return responseJson.data.rows;
                    })
                    .catch((error) => {
                        Reactotron.log("error found");
                        Reactotron.error(error);
                    });
            }
        });

        // Set the readOffset to the first record in the state
        dataset.setReadOffset(0);
        this.setState({ dataset });
    }

    renderItem() {
        return this.state.datasetState.map((item, index) => {
            //console.log("Record came. Index is " + index);
            var imageURL = 'http://i3.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large';
            imageHeight=150;
            //imageWidth=250;
            imageWidth=width*0.85;
            if (item !== undefined &&
                item != null &&
                item.content !== undefined &&
                item.content != null) {
                if (item.content.contentImage !== undefined &&
                    item.content.contentImage != null) {
                    imageURL = item.content.contentImage.url;
                    Reactotron.log("imageURL is " + imageURL)
                }
                else if (item.content.sourceBrandImage !== undefined &&
                    item.content.sourceBrandImage != null) {
                    imageURL = item.content.sourceBrandImage.url;
                    Reactotron.log("imageURL from brand is " + imageURL);
                    imageHeight = 50;
                    imageWidth = 250;
                }
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
                //Reactotron.log("item title is: "+item.content.title);
                //Reactotron.log("item content sourceNameUni is: "+item.content.sourceNameUni);
                //Reactotron.log("item content is: "+item.content.content);

                windowHeight = this.state.size.height;
                windowWidth = this.state.size.width;

                return (
                    // <TouchableHighlight onPress={this.onItemTap}>
                    <View style={{ height: windowHeight, width: windowWidth, flex: 1 }}>
                        <View style={[{ flex: 1 }, styles.card]}>
                            <ScrollView style={{ flex: 1 }}>
                                <TouchableHighlight onPress={() => this.onItemTap(item.content.deepLinkUrl)}>
                                    <View>
                                        <View style={[{ maxHeight: (95 / 100 * windowHeight), maxWidth: (95 / 100 * windowWidth) }, styles.cardItem]}>
                                            <Text>{item.content.title}</Text>
                                        </View>
                                        <View style={styles.cardItem}>
                                            <Image style={{ resizeMode: 'stretch', height: imageHeight, width: imageWidth }} source={{ uri: imageURL, cache: 'default' }} />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                                {/* <WebView
                                source={{ html: item.content.content }}
                                style={{flex:1}}
                                scalesPageToFit={true}
                                /> */}
                                {/* <MyWebViewFromHtml
                                    html={item.content.content}
                                    style={{ flex: 1 }}
                                    scalesPageToFit={true} /> */}
                                <HTMLView
                                    value={item.content.content}
                                    stylesheet={stylesHtml}
                                    style={{ marginLeft: 20, marginRight: 20, }}
                                    onLinkPress={(url) => console.log('clicked link: ', url)}
                                />
                                <TouchableHighlight onPress={() => this.onItemTap(item.content.deepLinkUrl)}>
                                    <View style={styles.cardItem}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                <Text>Source: {item.content.sourceNameUni}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </ScrollView>
                        </View>
                    </View>
                );
            }
        });
    }

    onLink(href) {
        Reactotron.log("Link was clicked!");     
      }

    setCurrentReadOffset = (event) => {
        // let itemHeight = 402;
        //let itemHeight = 220;
        let itemWidth = 300;
        //let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
        let currentOffset = Math.floor(event.nativeEvent.contentOffset.x);
        console.log('current scroll position of the list in pixels' + currentOffset);
        //let currentItemIndex = Math.ceil(currentOffset / itemHeight);
        let currentItemIndex = Math.ceil(currentOffset / itemWidth);
        console.log('currentItemIndex of the list in pixels' + currentItemIndex);
        this.state.dataset.setReadOffset(currentItemIndex);
    }

    setReadOffset = (currentItemIndex) => {
        console.log('currentItemIndex of the list is: ' + currentItemIndex);
        this.state.dataset.setReadOffset(currentItemIndex);
    }

    onItemTap(shareUrl) {
        console.log('shareUrl is: ' + shareUrl);
        this.props.navigation.navigate('WebViewCustomUrl', { url: shareUrl })
        //Alert.alert('You tapped the button! share url is:'+shareUrl);
        //this.dropdown.alertWithType("item.type", "title", "item.message");
    }

    render() {
        return (
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay={false}
                    pageInfo={true}
                    currentPage={0}
                    bullets={false}
                    onAnimateNextPage={(p) => console.log(p)}>
                    {this.renderItem()}
                    {/* <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}><Text>1</Text></View>
                    <View style={[{ backgroundColor: 'red' }, this.state.size]}><Text>2</Text></View>
                    <View style={[{ backgroundColor: 'blue' }, this.state.size]}><Text>3</Text></View> */}
                </Carousel>
            </View>
        );
    }
}

var bgColors = {
    "Default": "#FFFFFF",
    "Blue": "#00B1E1",
    "Cyan": "#37BC9B",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Yellow": "#F6BB42",
};

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
        height: 100,
        width: 200
    },
    imageCache: {
        height: 100,
        width: 200
    },
    card:{
        backgroundColor: bgColors.Default
    },
    cardItem:{
        margin:20,
        alignItems: 'flex-start', 
        justifyContent: 'flex-start' 
    },
    imageItem:{
        marginLeft:20,
        marginRight:20,
        alignItems: 'flex-start', 
        justifyContent: 'flex-start' 
    },
});

const stylesHtml = StyleSheet.create({
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
    
});