import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
  AmbientLight,
  PointLight,
} from 'react-vr';

import {
  Easing
} from 'react-native';

const AnimatedModel = Animated.createAnimatedComponent(Model);

export default class HashrocketVR extends React.Component {
  state = {
    rotation: new Animated.Value(0)
  }

  componentDidMount() {
    this.rotate();
  }

  rotate = () => {
    this.state.rotation.setValue(0);
    Animated.timing(
      this.state.rotation,
      {
        toValue: 360,
        duration: 10000,
        easing: Easing.linear,
      }
    ).start(this.rotate);
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <AmbientLight intensity={0.5} />
        <PointLight style={{color:'white', transform:[{translate:[0, 0, 0]}]}} />
        <AnimatedModel
          lit
          source={{
            obj: asset('hashrocket.obj'),
          }}
          style={{
            color: '#af1e23',
            transform: [
              {translate: [0, -3, -12]},
              {rotateY: this.state.rotation}
            ]
          }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('HashrocketVR', () => HashrocketVR);
