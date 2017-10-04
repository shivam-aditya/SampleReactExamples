
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';

import {
    StackNavigator,
    TabNavigator,
    TabBarBottom 
} from "react-navigation";

import {
    ChatScreen,
    RecentChatsScreen,
    AllContactsScreen,
    MainScreenNavigator
} from './components/navigationPage1';

import robotImpagination from './components/robotImpagination';
import robotImpagination2 from './components/RoboExampleClasses/RoboHome';
import DeckSwiperExample from './components/DeckSwiperExample';
import buzzhome from './components/buzzhome';
import Pager from './components/carouselSample1';
import { CarouselExample, CarouselExample2 } from './components/sixtyHome';
import { MyWebViewDefault, MyWebViewCustomUrl } from './components/WebViewExample';
import FadeInView from './components/AnimationSample';
import {YoutubeSample2, YoutubeSample} from './components/YoutubeControl';
import SomeComponent from './components/GestureSample';
import {DrawerSample} from './components/DrawerSample';
import {SliderSample, BottomSheet} from './components/SliderSample';
import {PickerExample} from './components/PickerSample'

export class HomeView extends Component {
    static navigationOptions = {
        title: `My Samples`,
      };
    render() {
        const { navigate } = this.props.navigation;        
        return (
            <ScrollView>
                <View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('sixty')} title="sixtyHome" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('newsHome')} title="newsHome" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('HomeOld')} title="HomeOld" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('WebViewCustomUrl', { url: 'http://www.greaterkashmir.com/news/kashmir/kashmir-two-killed-30-injured-in-tral-grenade-blast/260861.html' })} title="MyWebViewCustomUrl" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('WebViewDefault')} title="MyWebViewDefault" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('Deck')} title="DeckSwiperExample" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('Pagination')} title="robotImpagination-My implementation" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('Carousel')} title="Carousel" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('Buzz')} title="buzzhome" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('PaginationMaster')} title="robotImpagination" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('animationHome')} title="animationHome" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('youtubeSample')} title="youtubeSample" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('GestureSample')} title="GestureSample" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('DrawerSample')} title="DrawerSample" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('SliderSample')} title="SliderSample" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('BottomSheet')} title="BottomSheet" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => navigate('PickerExample')} title="PickerExample" />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default NavigationHome = StackNavigator({
    Home: { screen: HomeView },
    HomeOld: { screen: MainScreenNavigator},
    Chat: { screen: ChatScreen },
    WebViewCustomUrl: { screen: MyWebViewCustomUrl },
    WebViewDefault: { screen: MyWebViewDefault },
    Deck: { screen: DeckSwiperExample },          
    PaginationMaster: { screen: robotImpagination2 },
    Carousel: {screen:Pager},
    Buzz: { screen: buzzhome,
        navigationOptions: {
            title: 'Buzz'
    }},      
    Pagination: { screen: robotImpagination },        
    Recent: { screen: RecentChatsScreen },
    sixty: {screen: CarouselExample},  
    newsHome : {screen:CarouselExample2},
    animationHome : {screen:FadeInView},
    youtubeSample: {screen: YoutubeSample},
    GestureSample: {screen: SomeComponent},
    DrawerSample: {screen: DrawerSample},
    SliderSample: {screen: SliderSample},
    BottomSheet: {screen: BottomSheet},    
    PickerExample: {screen: PickerExample}                        
});

const styles = StyleSheet.create({
    button: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#ccc',
    }
});
