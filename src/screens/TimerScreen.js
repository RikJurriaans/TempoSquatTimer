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
            this.duration += 2;
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

        let { params } = this.props.navigation.state;

        let uniqueStates = [new State("eccentric",  params.timeEccentric,   "Down"),
                            new State("pause",      params.timeBottom,      "Pause"),
                            new State("concentric", params.timeConcentric,  "Up"),
                            new State("next rep",   params.timeBetweenReps, "Wait for next rep")];

        let allStates = _.concat(_.concat([new State("unrack", 5, "Unrack the bar")],
                                          _.filter(cycle(uniqueStates, params.repsToPerform), function(state) {
                                              return !(state.name == "pause" && state.duration == 0);
                                          })),
                                 [new State("next set", null, "Click to do your next set")]);

        let currentState = _.head(allStates);

        this.state = {
            states: allStates,
            currentState: currentState,
            currentStateIndex: 0,
            secondsCounter: currentState.duration,
            showNextButton: false,
        }

        this._toNextState = this._toNextState.bind(this);
        this._countDownSecond = this._countDownSecond.bind(this);

        /* setTimeout(, toMillis(currentState.duration));*/
        setInterval(this._countDownSecond, 1000);
    }

    _removeTimeout() {
        return;
    }

    _countDownSecond() {
        if (this.state.currentState.name == "next set") return; // this._removeTimeout();
        if (this.state.secondsCounter == 0) {
            this._toNextState();
            return;
        }

        this.setState({ secondsCounter: this.state.secondsCounter - 1 });
    }

    _toNextState() {
        let s = this.state;

        if (s.currentStateIndex == s.states.length - 1)
            return;

        let newCurrentStateIndex = s.currentStateIndex + 1;
        let newCurrentState = s.states[newCurrentStateIndex];

        this.setState({ currentState: newCurrentState,
                        currentStateIndex: newCurrentStateIndex,
                        secondsCounter: newCurrentState.duration });

        if (newCurrentState.duration == null) {
            this.setState({ showNextButton: true });
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>{ this.state.currentState.description }</Text>
                <Text style={styles.time}>{ this.state.secondsCounter }</Text>
                { this.state.showNextButton ?
                    <Button
                        title="perform another set"
                        onPress={() => {
                            console.log("Repeat process...");
                        }}/>
                    :
                    <View></View> }
            </View>
        );
    }
}
