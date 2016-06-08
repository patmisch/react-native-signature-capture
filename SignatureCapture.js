'use strict';

var React = require('react-native');

var {
  requireNativeComponent,
  DeviceEventEmitter,
  View,
  NativeModules
} = React;

var Component = requireNativeComponent('RSSignatureView', null);
const SignatureFunctions = NativeModules.RSSignatureViewManager;

var styles = {
  signatureBox: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  }
};

var subscription;

var SignatureCapture = React.createClass({
  componentDidMount: function() {
    subscription = DeviceEventEmitter.addListener(
        'onSaveEvent',
        this.props.onSaveEvent
    );

  },

  componentWillUnmount: function() {
    subscription.remove();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Component
          ref="rssSignView"
          style={styles.signatureBox}
          rotateClockwise={this.props.rotateClockwise}
          square={this.props.square}
        />
      </View>
    )
  }
});

module.exports = SignatureCapture;
