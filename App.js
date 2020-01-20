/**
 * Contextual pages bridging example React Native App
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Switch, ActivityIndicator, NativeModules, Linking, Alert} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class TogglePlot extends Component {
  componentDidMount(){
    // Toggle the state every second
    setInterval(() => (
      this.isPlotLoading(this.state.plotEnabled)
    ), 1000);
  }

  state = {
    plotEnabled:true,
    plotLoading:true
  }

  togglePlot = (newValue) => {
    newValue ? Plot.enable() : Plot.disable();
    this.setState(
      {
        plotEnabled: newValue,
        plotLoading: true
      }
    )
  }

  isPlotLoading = (uiPlotState) => {
    (async () => {
      const isEnabled = await Plot.isEnabled();
      this.setState({plotLoading: isEnabled != uiPlotState});
    })()
  }
  
  render(){
    return (
        <View>
        { this.state.plotLoading ? <ActivityIndicator size="large"></ActivityIndicator> :
        <View style={styles.rowHolder}>
          <Text>Plot is {this.state.plotEnabled ? 'ENABLED':'DISABLED'}</Text>
          <Switch onValueChange = {this.togglePlot} value = {this.state.plotEnabled}/>
    </View> }
        </View>
        );
  }
}

type Props = {};
var Plot = NativeModules.PlotBridge;
export default class App extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Plot React Native Bridge Example</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TogglePlot />
        <View style={styles.buttonHolder}>
          <Button style={styles.buttonWithMargin}
        onPress={requestContextualPage}
      title="Request Contextual Page"/>
        </View>
        <View style={styles.buttonHolder}>
          <Button style={styles.buttonWithMargin}
        onPress={setSegmentation}
      title="Set example segmentation string"/>
        </View>
      </View>
    );
  }
}

var requestContextualPage = async () => {
  try {
    const result = await Plot.requestContextualPage();
    if (result){
      Linking.canOpenURL(result).then(supported => {
        if (supported) {
          Linking.openURL(result);
        } else {
          console.log("Don't know how to open URI: " + result);
        }
      });
    } else {
      Alert.alert('No contextual page found.')
    }
  } catch(e) {
    console.error(e);
  }
}

var setSegmentation = () => {
  Plot.setStringSegmentationProperty("user_id", "123456")
  Alert.alert('Segmentation property user_id set with value 123456')
}

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
  },
  rowHolder:{
    flexDirection: 'row',
    marginTop:20
  },
  buttonHolder: {
    marginTop:20
  }
});
