import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
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

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repsToPerform: null,
            timeEccentric: null,
            timeBottom: null,
            timeConcentric: null,
            timeBetweenReps: null,
        };

        this.fields = [{label: "How many reps do you need to perform?", stateKey: "repsToPerform"},
                       {label: "How many seconds do your eccentrics need to take?", stateKey: "timeEccentric"},
                       {label: "How many seconds do your pauses at the bottom of the squat?", stateKey: "timeBottom"},
                       {label: "How many seconds do your concentrics need to take?", stateKey: "timeConcentric"},
                       {label: "How many seconds do you need to rest between reps?", stateKey: "timeBetweenReps"}];
    }

    _focusNextField(ref) {
        return () => {
            this.refs[ref].focus();
        }
    }

    render() {
        return (
        <ScrollView style={styles.outerContainer}>
            <Text style={styles.welcome}>Tempo Squat Timer</Text>

            {this.fields.map((obj, idx) => {
                let idxPlus1 = idx + 1;
                let isLast = this.fields.length == idxPlus1

                return (
                   <View key={idx}>
                       <Text>{obj.label}</Text>
                       <TextInput
                           ref={idx}
                           onSubmitEditing={isLast ? null : this._focusNextField(idxPlus1)}
                           onChangeText={(text) => {
                               this.setState[obj.stateKey] = text;
                           }}
                           returnKeyType={isLast ? "done" : "next"}
                           keyboardType={"numeric"} />
                   </View>);
             })}
        </ScrollView>);
    }
}
