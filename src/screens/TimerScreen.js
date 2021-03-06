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

function toMillis(seconds) {
    return seconds * 1000;
}

export default class TimerScreen extends Component {
    intervalId: null;

    constructor(props) {
        super(props);

        let { params } = this.props.navigation.state;

        let uniqueStates   = [new State("eccentric",  params.timeEccentric,   "Down"),
                              new State("pause",      params.timeBottom,      "Pause"),
                              new State("concentric", params.timeConcentric,  "Up"),
                              new State("next rep",   params.timeBetweenReps, "Wait for next rep")];

        let unrackCommand  = [new State("unrack", 5, "Unrack the bar")];
        let nextSetCommand = [new State("next set", null, "Click to do your next set")];
        let cycledStates = _.flatten(_.times(params.repsToPerform, uniqueStates));
        let filteredTimelessPauses = _.filter(cycledStates, state => !(state.name == "pause" && state.duration == 0));

        let allStates = _.concat(_.dropRight(_.concat(unrackCommand, filteredTimelessPauses)), nextSetCommand);

        this.state = Object.assign({
            states: allStates,
        }, this._getNullState(_.head(allStates)));

        this._toNextState = this._toNextState.bind(this);
        this._countDownSecond = this._countDownSecond.bind(this);

        this._startNewSet();
    }

    _rewindState() {
        this.setState(this._getNullState(_.head(this.state.states)));
    }

    _getNullState(currentState) {
        return {
            currentState: currentState,
            currentStateIndex: 0,
            secondsCounter: currentState.duration,
            showNextButton: false,
        };
    }

    _startNewSet() {
        intervalId = setInterval(this._countDownSecond, 1000);
    }

    _countDownSecond() {
        if (this.state.currentState.name == "next set") {
            clearTimeout(intervalId);
            return;
        }
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
                <Text style={styles.time}>{ this.state.secondsCounter }</Text>
                <Text>{ this.state.currentState.description }</Text>
                { this.state.showNextButton ?
                    <Button
                        title="perform another set"
                        onPress={() => {
                            this._rewindState();
                            this._startNewSet();
                        }}/>
                    :
                    <View></View> }
            </View>);
    }
}

const styles = StyleSheet.create({
    time: {
        fontSize: 34,
    },
});
