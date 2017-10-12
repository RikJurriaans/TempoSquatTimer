import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Button
} from 'react-native';

export default class TimerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsLeft: 0,
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text style={styles.time}>
                {this.state.secondsLeft}
            </Text>
                <Text>hello</Text>
                <Text>{ params.timeEccentric }</Text>
            </View>
        );
    }
}
