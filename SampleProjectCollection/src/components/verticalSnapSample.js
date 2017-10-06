import React, { Component } from 'react';
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
    Animated,
    Button,
    TouchableOpacity
} from 'react-native';

import {
    Spinner
} from 'native-base';

import Carousel from 'react-native-snap-carousel';
import Reactotron from 'reactotron-react-native';

//import Carousel from 'react-native-looped-carousel';
import Dataset from 'impagination';
import HTMLView from 'react-native-htmlview';
import SlidingUpPanel from 'rn-sliding-up-panel'

const { width, height } = Dimensions.get('window');

// export class VerticalCarouselExample2 extends Component {
//     _renderItem ({item, index}) {
//         return (
//             <View style={styles.slide}>
//                 <Text style={styles.title}>{ item.title }</Text>
//             </View>
//         );
//     }

//     render () {
//         return (
//             <Carousel
//               ref={(c) => { this._carousel = c; }}
//               data={this.state.entries}
//               renderItem={this._renderItem}
//               sliderWidth={sliderWidth}
//               itemWidth={itemWidth}
//             />
//         );
//     }
// }

export class VerticalCarouselExample2 extends Component {
    static navigationOptions = {
        title: `News`,
    };

    static defaultProps = {
        draggableRange: {
            top: height, //defines height of bottom slider. default value is height/1.5
            bottom: 120
        }
    }

    _draggedValue = new Animated.Value(-120);

    constructor(props) {
        super(props);

        this.state = {
            _defaultWebViewContent:'Bottom Sheet Content',
        }
        this._isThisFirstItem = true;                
        this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this);
    }

    setCarouselRef = (ref) => {
        this.carousel = ref
    }

    getCurrentPage() {
        return this.carousel && this.carousel.getCurrentPage()
    }

    _onLayoutDidChange = (e) => {
        Reactotron.log("_onLayoutDidChange called.");
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    componentWillMount() {
        //console.log(this);
        this.setupImpagination();
    }

    componentDidUpdate() {
        //Reactotron.log("componentDidUpdate called. 1st item visibility is:" + this._isThisFirstItem);
        if(this._isThisFirstItem===true && this.state.datasetState[0].content!=null)
        {
            //Reactotron.log("1st item content is:" + this.state.datasetState[0].content.content);                            
            this.setState({_defaultWebViewContent:this.state.datasetState[0].content.content});
            this._isThisFirstItem = false;
        }                                               
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
                //http://api-news.dailyhunt.in/api/v1/pages/topic/content/104?returnTickers=false&pageNumber=1&src=orig&dsSalt=1507115410834&langCode=en,hi&pageSize=10&cdn=N&dsSize=50&pageScrollStart=1507115410834&cpMaxIndex=9&state=published&dsOffset=0
                //http://api-news.dailyhunt.in/api/v1/pages/topic/content/8?returnTickers=false&pageNumber=1&pageScrollStart=1507115373000&src=orig&dsSalt=20171004164252513&langCode=en,hi&cpMaxIndex=9&pageSize=10&state=published&cdn=N&dsOffset=0
                //http://api-news.dailyhunt.in/api/v1/headlines/user/889065839?returnTickers=false&pageNumber=1&pageScrollStart=1506324249000&src=orig&dsSalt=20170925125512127&langCode=en,hi&cpMaxIndex=9&edition=india&pageSize=10&isHome=true&cdn=N&dsOffset=0
                url = "http://api-news.dailyhunt.in/api/v1/headlines/user/889065839?returnTickers=false&pageNumber=" + realPage + "&pageScrollStart=1506324249000&src=orig&dsSalt=20170925125512127&langCode=en,hi&cpMaxIndex=" + maxIndex + "&edition=india&pageSize=" + pageSize + "&isHome=true&cdn=N&dsOffset=0";
                //url="http://api-news.dailyhunt.in/api/v1/pages/topic/content/8?returnTickers=false&pageNumber=" + realPage + "&pageScrollStart=1507115373000&src=orig&dsSalt=20171004164252513&langCode=en,hi&cpMaxIndex=" + maxIndex + "&pageSize=" + pageSize + "&state=published&cdn=N&dsOffset=0";
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

    _renderItem({ item, index }) {
        var imageURL = 'http://i3.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large';
        imageHeight = 200;
        //imageWidth=250;
        imageWidth = width * 0.85;
        if (item !== undefined &&
            item != null &&
            item.content !== undefined &&
            item.content != null) {
            if (item.content.contentImage !== undefined &&
                item.content.contentImage != null) {
                imageURL = item.content.contentImage.url;
                //Reactotron.log("imageURL is " + imageURL)
            }
            else if (item.content.sourceBrandImage !== undefined &&
                item.content.sourceBrandImage != null) {
                imageURL = item.content.sourceBrandImage.url;
                //Reactotron.log("imageURL from brand is " + imageURL);
                imageHeight = 50;
                imageWidth = 250;
            }
        }

        if (item.isPending && !item.isSettled) {
            return <Spinner color="#00C497" key={Math.random()} />;
        }

        if (item !== undefined &&
            item != null &&
            item.content !== undefined &&
            item.content != null) {
            //Reactotron.log("item title is: "+item.content.title);
            //Reactotron.log("item content sourceNameUni is: "+item.content.sourceNameUni);
            //Reactotron.log("item content is: " + item.content.content);

            // windowHeight = this.state.size.height;
            // windowWidth = this.state.size.width;

            windowHeight = height;
            windowWidth = width;

            webViewContent = item.content.content;
            if (webViewContent.length > 200) {
                //Reactotron.log("Length greater than 200");
                webViewContent = webViewContent.slice(1, 200);
                webViewContent = webViewContent.concat("...");
                //Reactotron.log("webViewContent content is: " + webViewContent);
            }

            return (
                <View style={{ height: windowHeight, width: windowWidth, flex: 1 }}>
                    <View style={[{ flex: 1 }, styles.card]}>
                        <TouchableHighlight onPress={() => this.onItemTap(item.content.deepLinkUrl)}>
                            <View>
                                <View style={styles.cardItem}>
                                    <Image style={{ resizeMode: 'stretch', height: imageHeight, width: imageWidth }} source={{ uri: imageURL, cache: 'default' }} />
                                </View>
                                <View style={[{ maxHeight: (95 / 100 * windowHeight), maxWidth: (95 / 100 * windowWidth) }, styles.cardItem]}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                        {item.content.title}
                                    </Text>
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
                            value={webViewContent}
                            stylesheet={stylesHtml}
                            style={{ marginLeft: 20, marginRight: 20, }}
                            onLinkPress={(url) => Reactotron.log('clicked link: ', url)}
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
                    </View>
                </View>
            );
        }
    }

    renderItem() {
        return this.state.datasetState.map((item, index) => {
            //Reactotron.log("Record came. Index is " + index);
            var imageURL = 'http://i3.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large';
            imageHeight = 200;
            //imageWidth=250;
            imageWidth = width * 0.85;
            if (item !== undefined &&
                item != null &&
                item.content !== undefined &&
                item.content != null) {
                if (item.content.contentImage !== undefined &&
                    item.content.contentImage != null) {
                    imageURL = item.content.contentImage.url;
                    //Reactotron.log("imageURL is " + imageURL)
                }
                else if (item.content.sourceBrandImage !== undefined &&
                    item.content.sourceBrandImage != null) {
                    imageURL = item.content.sourceBrandImage.url;
                    //Reactotron.log("imageURL from brand is " + imageURL);
                    imageHeight = 50;
                    imageWidth = 250;
                }
            }

            if (item.isPending && !item.isSettled) {
                return <Spinner color="#00C497" key={Math.random()} />;
            }

            if (item !== undefined &&
                item != null &&
                item.content !== undefined &&
                item.content != null) {
                //Reactotron.log("item title is: "+item.content.title);
                //Reactotron.log("item content sourceNameUni is: "+item.content.sourceNameUni);
                //Reactotron.log("item content is: " + item.content.content);

                windowHeight = this.state.size.height;
                windowWidth = this.state.size.width;

                webViewContent = item.content.content;
                if (webViewContent.length > 200) {
                    //Reactotron.log("Length greater than 200");
                    webViewContent = webViewContent.slice(1, 200);
                    webViewContent = webViewContent.concat("...");
                    //Reactotron.log("webViewContent content is: " + webViewContent);
                }

                return (
                    <View style={{ height: windowHeight, width: windowWidth, flex: 1 }}>
                        <View style={[{ flex: 1 }, styles.card]}>
                            <TouchableHighlight onPress={() => this.onItemTap(item.content.deepLinkUrl)}>
                                <View>
                                    <View style={styles.cardItem}>
                                        <Image style={{ resizeMode: 'stretch', height: imageHeight, width: imageWidth }} source={{ uri: imageURL, cache: 'default' }} />
                                    </View>
                                    <View style={[{ maxHeight: (95 / 100 * windowHeight), maxWidth: (95 / 100 * windowWidth) }, styles.cardItem]}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                            {item.content.title}
                                        </Text>
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
                                value={webViewContent}
                                stylesheet={stylesHtml}
                                style={{ marginLeft: 20, marginRight: 20, }}
                                onLinkPress={(url) => Reactotron.log('clicked link: ', url)}
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
                        </View>
                    </View>
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
        Reactotron.log('currentItemIndex of the list is: ' + currentItemIndex);
        //Reactotron.log(this.state.datasetState[currentItemIndex].content.content);
        this.setState({visible: false, _defaultWebViewContent:this.state.datasetState[currentItemIndex].content.content})
        //this.state.dataset.setReadOffset(currentItemIndex);
    }

    onItemTap(shareUrl) {
        console.log('shareUrl is: ' + shareUrl);
        this.props.navigation.navigate('WebViewCustomUrl', { url: shareUrl })
        //Alert.alert('You tapped the button! share url is:'+shareUrl);
        //this.dropdown.alertWithType("item.type", "title", "item.message");
    }

    _renderFavoriteIcon() {
        const { top, bottom } = this.props.draggableRange
        const draggedValue = this._draggedValue.interpolate({
            inputRange: [-(top + bottom) / 2, -bottom],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        const transform = [{ scale: draggedValue }]

        return (
            <Animated.View style={[styles.favoriteIcon, { transform }]}>
                <Image source={require('../../assets/arrow-up.png')} style={{ width: 32, height: 32 }} />
            </Animated.View>
        )
      }

    //onAnimateNextPage={(p) => console.log(p)}> 
    render() {
        return (
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                {/* <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay={false}
                    pageInfo={true}
                    currentPage={0}
                    bullets={false}
                    onAnimateNextPage={this.setReadOffset}>
                    {this.renderItem()}
                </Carousel> */}
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.datasetState}
                    renderItem={this._renderItem}
                    sliderHeight={height}
                    itemHeight={height}
                    vertical={true}
                    lockScrollWhileSnapping={true}
                    onSnapToItem={this.setReadOffset}	
                />
                <SlidingUpPanel
                    visible
                    showBackdrop={false}
                    ref={(c) => { this._panel = c }}
                    draggableRange={this.props.draggableRange}
                    onDrag={(v) => this._draggedValue.setValue(v)}>
                    <View style={styles.panel}>
                        {this._renderFavoriteIcon()}
                        <View style={styles.panelHeader}>
                            <Text style={{ color: '#FFF' }}>News Details</Text>
                        </View>
                        <View style={styles.container}>
                            {/* <Text>{this.state._defaultWebViewContent}</Text> */}
                            <HTMLView
                                    value={this.state._defaultWebViewContent}
                                    stylesheet={stylesHtml}
                                    style={{ marginTop:10, marginLeft: 20, marginRight: 20, }}
                                    onLinkPress={(url) => Reactotron.log('clicked link: ', url)}
                                />
                            {/* <WebView
                                source={{ html: this.state._defaultWebViewContent }}
                                style={{flex:1, marginLeft: 20, marginRight: 20 }}
                                scalesPageToFit={true}
                                /> */}
                        </View>
                    </View>
                </SlidingUpPanel>
            </View>
        );
    }
}

export class VerticalCarouselExample extends Component {
    static navigationOptions = {
        title: `News`,
    };

    static defaultProps = {
        draggableRange: {
            top: height, //defines height of bottom slider. default value is height/1.5
            bottom: 120
        }
    }

    _draggedValue = new Animated.Value(-120);

    constructor(props) {
        super(props);

        this.state = {
            _defaultWebViewContent:'Bottom Sheet Content',
        }
        this._isThisFirstItem = true;                
        this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this);
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

    componentDidUpdate() {
        //Reactotron.log("componentDidUpdate called. 1st item visibility is:" + this._isThisFirstItem);
        if(this._isThisFirstItem===true && this.state.datasetState[0].content!=null)
        {
            //Reactotron.log("1st item content is:" + this.state.datasetState[0].content.content);                            
            this.setState({_defaultWebViewContent:this.state.datasetState[0].content.content});
            this._isThisFirstItem = false;
        }                                               
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
                //http://api-news.dailyhunt.in/api/v1/pages/topic/content/104?returnTickers=false&pageNumber=1&src=orig&dsSalt=1507115410834&langCode=en,hi&pageSize=10&cdn=N&dsSize=50&pageScrollStart=1507115410834&cpMaxIndex=9&state=published&dsOffset=0
                //http://api-news.dailyhunt.in/api/v1/pages/topic/content/8?returnTickers=false&pageNumber=1&pageScrollStart=1507115373000&src=orig&dsSalt=20171004164252513&langCode=en,hi&cpMaxIndex=9&pageSize=10&state=published&cdn=N&dsOffset=0
                //http://api-news.dailyhunt.in/api/v1/headlines/user/889065839?returnTickers=false&pageNumber=1&pageScrollStart=1506324249000&src=orig&dsSalt=20170925125512127&langCode=en,hi&cpMaxIndex=9&edition=india&pageSize=10&isHome=true&cdn=N&dsOffset=0
                url = "http://api-news.dailyhunt.in/api/v1/headlines/user/889065839?returnTickers=false&pageNumber=" + realPage + "&pageScrollStart=1506324249000&src=orig&dsSalt=20170925125512127&langCode=en,hi&cpMaxIndex=" + maxIndex + "&edition=india&pageSize=" + pageSize + "&isHome=true&cdn=N&dsOffset=0";
                //url="http://api-news.dailyhunt.in/api/v1/pages/topic/content/8?returnTickers=false&pageNumber=" + realPage + "&pageScrollStart=1507115373000&src=orig&dsSalt=20171004164252513&langCode=en,hi&cpMaxIndex=" + maxIndex + "&pageSize=" + pageSize + "&state=published&cdn=N&dsOffset=0";
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
            //Reactotron.log("Record came. Index is " + index);
            var imageURL = 'http://i3.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large';
            imageHeight = 200;
            //imageWidth=250;
            imageWidth = width * 0.85;
            if (item !== undefined &&
                item != null &&
                item.content !== undefined &&
                item.content != null) {
                if (item.content.contentImage !== undefined &&
                    item.content.contentImage != null) {
                    imageURL = item.content.contentImage.url;
                    //Reactotron.log("imageURL is " + imageURL)
                }
                else if (item.content.sourceBrandImage !== undefined &&
                    item.content.sourceBrandImage != null) {
                    imageURL = item.content.sourceBrandImage.url;
                    //Reactotron.log("imageURL from brand is " + imageURL);
                    imageHeight = 50;
                    imageWidth = 250;
                }
            }

            if (item.isPending && !item.isSettled) {
                return <Spinner color="#00C497" key={Math.random()} />;
            }

            if (item !== undefined &&
                item != null &&
                item.content !== undefined &&
                item.content != null) {
                //Reactotron.log("item title is: "+item.content.title);
                //Reactotron.log("item content sourceNameUni is: "+item.content.sourceNameUni);
                //Reactotron.log("item content is: " + item.content.content);

                windowHeight = this.state.size.height;
                windowWidth = this.state.size.width;

                webViewContent = item.content.content;
                if (webViewContent.length > 200) {
                    //Reactotron.log("Length greater than 200");
                    webViewContent = webViewContent.slice(1, 200);
                    webViewContent = webViewContent.concat("...");
                    //Reactotron.log("webViewContent content is: " + webViewContent);
                }

                return (
                    <View style={{ height: windowHeight, width: windowWidth, flex: 1 }}>
                        <View style={[{ flex: 1 }, styles.card]}>
                            <TouchableHighlight onPress={() => this.onItemTap(item.content.deepLinkUrl)}>
                                <View>
                                    <View style={styles.cardItem}>
                                        <Image style={{ resizeMode: 'stretch', height: imageHeight, width: imageWidth }} source={{ uri: imageURL, cache: 'default' }} />
                                    </View>
                                    <View style={[{ maxHeight: (95 / 100 * windowHeight), maxWidth: (95 / 100 * windowWidth) }, styles.cardItem]}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                            {item.content.title}
                                        </Text>
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
                                value={webViewContent}
                                stylesheet={stylesHtml}
                                style={{ marginLeft: 20, marginRight: 20, }}
                                onLinkPress={(url) => Reactotron.log('clicked link: ', url)}
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
                        </View>
                    </View>
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
        //Reactotron.log('currentItemIndex of the list is: ' + currentItemIndex);
        //Reactotron.log(this.state.datasetState[currentItemIndex].content.content);
        this.setState({visible: false, _defaultWebViewContent:this.state.datasetState[currentItemIndex].content.content})
        //this.state.dataset.setReadOffset(currentItemIndex);
    }

    onItemTap(shareUrl) {
        console.log('shareUrl is: ' + shareUrl);
        this.props.navigation.navigate('WebViewCustomUrl', { url: shareUrl })
        //Alert.alert('You tapped the button! share url is:'+shareUrl);
        //this.dropdown.alertWithType("item.type", "title", "item.message");
    }

    _renderFavoriteIcon() {
        const { top, bottom } = this.props.draggableRange
        const draggedValue = this._draggedValue.interpolate({
            inputRange: [-(top + bottom) / 2, -bottom],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        const transform = [{ scale: draggedValue }]

        return (
            <Animated.View style={[styles.favoriteIcon, { transform }]}>
                <Image source={require('../../assets/arrow-up.png')} style={{ width: 32, height: 32 }} />
            </Animated.View>
        )
      }

    //onAnimateNextPage={(p) => console.log(p)}> 
    render() {
        return (
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                {/* <Button
                    onPress={() => navigate('Chat', { user: 'Lucy' })}
                    title="Chat with Lucy"
                /> */}
                <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay={false}
                    pageInfo={true}
                    currentPage={0}
                    bullets={false}
                    onAnimateNextPage={this.setReadOffset}>
                    {this.renderItem()}
                    {/* <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}><Text>1</Text></View>
                    <View style={[{ backgroundColor: 'red' }, this.state.size]}><Text>2</Text></View>
                    <View style={[{ backgroundColor: 'blue' }, this.state.size]}><Text>3</Text></View> */}
                </Carousel>
                <SlidingUpPanel
                    visible
                    showBackdrop={false}
                    ref={(c) => { this._panel = c }}
                    draggableRange={this.props.draggableRange}
                    onDrag={(v) => this._draggedValue.setValue(v)}>
                    <View style={styles.panel}>
                        {this._renderFavoriteIcon()}
                        <View style={styles.panelHeader}>
                            <Text style={{ color: '#FFF' }}>News Details</Text>
                        </View>
                        <View style={styles.container}>
                            {/* <Text>{this.state._defaultWebViewContent}</Text> */}
                            <HTMLView
                                    value={this.state._defaultWebViewContent}
                                    stylesheet={stylesHtml}
                                    style={{ marginTop:10, marginLeft: 20, marginRight: 20, }}
                                    onLinkPress={(url) => Reactotron.log('clicked link: ', url)}
                                />
                            {/* <WebView
                                source={{ html: this.state._defaultWebViewContent }}
                                style={{flex:1, marginLeft: 20, marginRight: 20 }}
                                scalesPageToFit={true}
                                /> */}
                        </View>
                    </View>
                </SlidingUpPanel>
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
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      panel: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative'
      },
      panelHeader: {
        height: 40,
        backgroundColor: '#b197fc',
        alignItems: 'center',
        justifyContent: 'center'
      },
      favoriteIcon: {
        position: 'absolute',
        top: 0,
        right: 24,
        backgroundColor: '#2b8a3e',
        width: 48,
        height: 48,
        padding: 8,
        borderRadius: 24,
        zIndex: 1
      }
});

const stylesHtml = StyleSheet.create({
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
    
});