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
});

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Config',
    }

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
                                this.state[obj.stateKey] = text;
                           }}
                           returnKeyType={isLast ? "done" : "next"}
                           keyboardType={"numeric"} />
                   </View>);
             })}

            <Button
              title="start timer"
              onPress={() => {
                  navigate('Timer', this.state)
              }}/>
        </ScrollView>);
    }
}

class TimerScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Tempo squat timer!',
    })

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
    Home: { screen: HomeScreen },
    Timer: { screen: TimerScreen }
})

export default App;
