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
    stateName: null
    stateTime: null

    constructor(stateName, stateDuration) {
        this.stateName = stateName;
        this.stateDuration = stateDuration;
    }
}

function stateFactory(stateName, stateDuration) {
    return new State(stateName, stateDuration);
}

// Contribute this to lodash it's rediculous that they do not have a function for this.
function cycle(array, count) {
    var res = [];
    for (var i = count; i > 0; i--) {
        res = _.concat(res, array);
    }
    return res;
}

export default class TimerScreen extends Component {
    constructor(props) {
        super(props);

        var { params } = this.props.navigation.state;
        var uniqueStates = [stateFactory("eccentric", params.timeEccentric),
                            stateFactory("pause", params.timeBottom),
                            stateFactory("concentric", params.timeConcentric),
                            stateFactory("next rep", params.timeBetweenReps)];
        var allStates = _.merge([stateFactory("eccentric", params.timeEccentric)],
                                cycle(uniqueStates, params.repsToPerform))
        console.log(allStates);

        this.state = {
            states: allStates,
            currentState: 0,
            secondsLeft: 0,
        }

        this._toNextState = this._toNextState.bind(this);
        /* setTimeout(this._toNextState, this.state.states[0]);*/
    }

    _toNextState() {
        this.state.states
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
