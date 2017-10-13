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
import _ from 'lodash';

const styles = StyleSheet.create({
    time: {
        fontSize: 34,
    },
});

class State {
    name: null
    duration: null
    description: null

    constructor(stateName, stateDuration, stateDescription) {
        this.name = stateName;
        this.duration = stateDuration;
        this.description = stateDescription;

        if (stateName == "concentric" && stateDuration == 0) {
            this.duration += 1;
        }
    }
}

// Contribute this to lodash it's rediculous that they do not have a function for this.
function cycle(array, count) {
    var res = [];
    for (var i = count; i > 0; i--) {
        res = _.concat(res, array);
    }
    return res;
}

function toMillis(seconds) {
    return seconds * 1000;
}

export default class TimerScreen extends Component {
    constructor(props) {
        super(props);

        var { params } = this.props.navigation.state;

        var uniqueStates = [new State("eccentric",  params.timeEccentric,   "Down"),
                            new State("pause",      params.timeBottom,      "Pause"),
                            new State("concentric", params.timeConcentric,  "Up"),
                            new State("next rep",   params.timeBetweenReps, "Wait for next rep")];

        var allStates = _.concat([new State("unrack", 5, "Unrack the bar")],
                                 _.filter(cycle(uniqueStates, params.repsToPerform), function(state) {
                                     return !(state.name == "pause" && state.duration == 0);
                                 }));

        var currentState = _.head(allStates);

        this.state = {
            states: allStates,
            currentState: currentState,
            currentStateIndex: 0,
            secondsCounter: currentState.duration,
        }

        this._toNextState = this._toNextState.bind(this);

        setTimeout(this._toNextState, toMillis(currentState.duration));
    }

    _toNextState() {
        var s = this.state;

        if (s.currentStateIndex == s.states.length - 1)
            return;

        var newCurrentStateIndex = s.currentStateIndex + 1;
        var newCurrentState = s.states[newCurrentStateIndex];

        this.setState({ currentState: newCurrentState,
                        currentStateIndex: newCurrentStateIndex });
        setTimeout(this._toNextState, toMillis(newCurrentState.duration));
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text style={styles.time}>
                    { this.state.secondsCounter }
                    { this.state.currentState.description }
                </Text>
            </View>
        );
    }
}
