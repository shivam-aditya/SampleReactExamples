import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Platform,
    ScrollView
} from 'react-native';

import {
    DrawerNavigator
} from "react-navigation";

// class MyHomeScreen extends React.Component {
//     static navigationOptions = {
//         drawerLabel: 'Home',
//         drawerIcon: ({ tintColor }) => (
//             <Image
//                 source={require('../../assets/chats-icon.png')}
//                 style={[styles.icon, { tintColor: tintColor }]}
//             />
//         ),
//     };

//     render() {
//         return (
//             <Button
//                 onPress={() => this.props.navigation.navigate('Notifications')}
//                 title="Go to notifications"
//             />
//         );
//     }
// }

// class MyNotificationsScreen extends React.Component {
//     static navigationOptions = {
//         drawerLabel: 'Notifications',
//         drawerIcon: ({ tintColor }) => (
//             <Image
//                 source={require('../../assets/notif-icon.png')}
//                 style={[styles.icon, { tintColor: tintColor }]}
//             />
//         ),
//     };

//     render() {
//         return (
//             <Button
//                 onPress={() => this.props.navigation.goBack()}
//                 title="Go back home"
//             />
//         );
//     }
// }

// const styles = StyleSheet.create({
//     icon: {
//         width: 24,
//         height: 24,
//     },
// });

// export const DrawerSample = DrawerNavigator({
//     Home: {
//         screen: MyHomeScreen,
//     },
//     Notifications: {
//         screen: MyNotificationsScreen,
//     },
// });

const MyNavScreen = ({ navigation, banner }) => (
    <ScrollView style={styles.container}>
        <Text>{banner}</Text>
        <Button
            onPress={() => navigation.navigate('DrawerOpen')}
            title="Open drawer"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </ScrollView>
);

const InboxScreen = ({ navigation }) => (
    <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />
);
InboxScreen.navigationOptions = {
    drawerLabel: 'Inbox',
    drawerIcon: ({ tintColor }) => (
        <Image
            source={require('../../assets/chats-icon.png')}
            style={[styles.icon, { tintColor: tintColor }]}
        />
    ),
};

const DraftsScreen = ({ navigation }) => (
    <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
DraftsScreen.navigationOptions = {
    drawerLabel: 'Drafts',
    drawerIcon: ({ tintColor }) => (
        <Image
            source={require('../../assets/notif-icon.png')}
            style={[styles.icon, { tintColor: tintColor }]}
        />
    ),
};

export const DrawerSample = DrawerNavigator(
    {
        Inbox: {
            path: '/',
            screen: InboxScreen,
        },
        Drafts: {
            path: '/sent',
            screen: DraftsScreen,
        },
    },
    {
        initialRouteName: 'Drafts',
        contentOptions: {
            activeTintColor: '#e91e63',
        },
    }
);

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    icon: {
        width: 24,
        height: 24,
    }
});