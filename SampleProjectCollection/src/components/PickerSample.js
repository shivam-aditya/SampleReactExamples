import React, { Component, PropTypes } from 'react';

import {
    Picker,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    View
} from 'react-native';

const Item = Picker.Item;

export class PickerExample extends Component {
    state = { user: '' }

    updateUser = (itemValue, itemIndex) => {
        this.setState({ user: itemValue })
    }

    render() {
        return (
            <View>
                <Picker selectedValue={this.state.user}
                    onValueChange={this.updateUser}
                    prompt="Pick one, just one">
                    <Picker.Item label="Steve" value="steve" />
                    <Picker.Item label="Ellen" value="ellen" />
                    <Picker.Item label="Maria" value="maria" />
                </Picker>
                <Text style={styles.text}>{this.state.user}</Text>
            </View>
        )
    }
}
export default PickerExample

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    }
})