import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            repsToPerform: '',
            timeEccentric: '',
            timeBottom: '',
            timeConcentric: '',
            timeBetweenReps: '',
        };
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Tempo Squat Timer</Text>

            <Text>How many reps do you need to perform?</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(repsToPerform) => { this.setState({repsToPerform}); }}/>

            <Text>How many seconds do your eccentrics need to take?</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(timeEccentric) => { this.setState({timeEccentric}); }}/>

            <Text>How many seconds do your pauses at the bottom of the squat?</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(timeBottom) => { this.setState({timeBottom}); }}/>

            <Text>How many seconds do your concentrics need to take?</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(timeConcentric) => { this.setState({timeConcentric}); }}/>

            <Text>How many seconds do you need to rest between reps?</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(timeBetweenReps) => { this.setState({timeBetweenReps}); }}/>
        </View>
        );
    }
}
