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
import Colors from '../Colors.js';

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: Colors.background,
    },
    headerBar: {
        backgroundColor: Colors.primaryDark,
    },
    title: {
        textAlign: "left",
        fontSize: 14,
        color: Colors.textOnPrimary,
        margin: 15,
    },
    innerContainer: {
        margin: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    formItem: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
    },
    label: {
        fontSize: 12,
    },
    textInput: {
    },
    textInputSelected: {
        color: Colors.lineSelectedColor,
    },
    textInputUnselected: {
        color: Colors.lineUnselectedColor,
    },
});

export default class ConfigurationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repsToPerform: 5,
            timeEccentric: 4,
            timeBottom: 0,
            timeConcentric: 0,
            timeBetweenReps: 5,
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
        const { navigate } = this.props.navigation;

        return (
        <ScrollView style={styles.outerContainer}>
            <View style={styles.headerBar}>
                <Text style={styles.title}>Tempo Squat Timer</Text>
            </View>

            <View style={styles.innerContainer}>
                {this.fields.map((obj, idx) => {
                    let idxPlus1 = idx + 1;
                    let isLast = this.fields.length == idxPlus1;

                    return (
                       <View style={styles.formItem} key={idx}>
                           <Text style={styles.label}>
                               {obj.label}
                           </Text>
                           <TextInput
                               style={styles.textInput}
                               ref={idx}
                               onSubmitEditing={isLast ? null : this._focusNextField(idxPlus1)}
                               value={this.state[obj.stateKey].toString()}
                               underlineColorAndroid={Colors.lineUnselectedColor}
                               selectTextOnFocus={true}
                               onChangeText={(text) => {
                                    this.state[obj.stateKey] = text;
                               }}
                               returnKeyType={isLast ? "done" : "next"}
                               keyboardType={"numeric"} />
                       </View>);
                 })}

                <Button
                  style={styles.callToAction}
                  title="start timer"
                  color={Colors.secondary}
                  onPress={() => {navigate('TimerScreen', this.state)}}/>
            </View>
        </ScrollView>);
    }
}
