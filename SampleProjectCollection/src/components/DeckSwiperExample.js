import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text } from 'native-base';

const cards = [
    {
        text: 'Card One',
        name: 'One',
        image: require('../../assets/cat.jpg'),
    },
    {
        text: 'Card One',
        name: 'One',
        image: require('../../assets/cat.jpg'),
    },
    {
        text: 'Card One',
        name: 'One',
        image: require('../../assets/cat.jpg'),
    },
    {
        text: 'Card One',
        name: 'One',
        image: require('../../assets/cat.jpg'),
    },
    {
        text: 'Card One',
        name: 'One',
        image: require('../../assets/cat.jpg'),
    },
    {
        text: 'Card One',
        name: 'One',
        image: require('../../assets/cat.jpg'),
    },
    {
        text: 'Card Last',
        name: 'Last',
        image: require('../../assets/cat.jpg'),
    },
];

export default class DeckSwiperExample extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'DeckSwiperExample',
      };
    render() {
        return (
            <Container style={{margin:20}}>
                <View>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Thumbnail source={item.image} />
                                    <Text>{item.text}</Text>
                                    <Text note>NativeBase</Text>
                                </CardItem>
                                <CardItem>
                                    <Image style={{ resizeMode: 'cover' }} source={item.image} />
                                </CardItem>
                                {/* <CardItem>
                                    <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.name}</Text>
                                </CardItem> */}
                            </Card>
                        }
                    />
                </View>
            </Container>
        );
    }
}