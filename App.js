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

export class Input extends Component<{}> {
    render() {
        return(
        <View>
            <Text>{this.props.children}</Text>
            <TextInput
                keyboardType='numeric'
                returnKeyType='next'
                selectTextOnFocus={true}
                blurOnSubmit={false}
                ref={(input) => {
                    this.props.inputs[this.props.fieldName] = input;
                }}
                onSubmitEditing={() => {
                    this.props.focusNextField()
                }}
                onChangeText={this.props.onChangeText}/>
        </View>
        );
    }
}

export class ConfigForm extends Component<{}> {
    render() {
        return(
        <View>
            {this.props.fieldsData.map((data) => {

            })}
        </View>
        );
    }
}

export default class App extends Component {
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

    _focusNextField(ref) {
        return () => {
            this.refs[ref].focus();
        }
    }

    render() {
        return (
        <ScrollView style={styles.outerContainer}>
            <Text style={styles.welcome}>Tempo Squat Timer</Text>

            <Text>How many reps do you need to perform?</Text>
            <TextInput
                ref={0}
                onSubmitEditing={this._focusNextField(1)}
                returnKeyType={"next"}
                keyboardType={"numeric"} />

            <Text>How many seconds do your eccentrics need to take?</Text>
            <TextInput
                ref={1}
                onSubmitEditing={this._focusNextField(2)}
                returnKeyType={"next"}
                keyboardType={"numeric"} />

            <Text>How many seconds do your pauses at the bottom of the squat?</Text>
            <TextInput
                ref={2}
                onSubmitEditing={this._focusNextField(3)}
                returnKeyType={"next"}
                keyboardType={"numeric"} />

            <Text>How many seconds do your concentrics need to take?</Text>
            <TextInput
                ref={3}
                onSubmitEditing={this._focusNextField(4)}
                returnKeyType={"next"}
                keyboardType={"numeric"} />

            <Text>How many seconds do you need to rest between reps?</Text>
            <TextInput
                ref={4}
                returnKeyType={"next"}
                keyboardType={"numeric"} />
        </ScrollView>);
    }
}
