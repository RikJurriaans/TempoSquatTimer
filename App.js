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
import {
    StackNavigator,
} from 'react-navigation';

const primary = "#0d47a1";
const primaryDark = "#002171";
const primaryLight = "#5472d3";
const textOnPrimary = "#ffffff";

const secondary = "#ffb300";
const secondaryDark = "#c68400";
const secondaryLight = "#ffe54c";
const textOnSecondary = "#000000";

const background = "#F5F5F6"

const lineUnselectedColor = "#808081";
const lineSelectedColor = primaryLight;

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: background,
    },
    headerBar: {
        backgroundColor: primaryDark,
    },
    title: {
        textAlign: "left",
        fontSize: 14,
        color: textOnPrimary,
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
        color: lineSelectedColor,
    },
    textInputUnselected: {
        color: lineUnselectedColor,
    },
    callToAction: {
        backgroundColor: secondary,
    },
    buttonText: {
        color: textOnSecondary,
    }
});

class ConfigurationScreen extends Component {
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
                               underlineColorAndroid={lineUnselectedColor}
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
                  color={secondary}
                  onPress={() => {
                      navigate('Timer', this.state)
                  }}/>
            </View>
        </ScrollView>);
    }
}

class TimerScreen extends Component {
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>{ params.timeEccentric }</Text>
            </View>
        );
    }
}

const App = StackNavigator({
    Configuration: { screen: ConfigurationScreen },
    Timer: { screen: TimerScreen }
}, {
    headerMode: "none"
})

export default App;
