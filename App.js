import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Torch from 'react-native-torch';
import RNSkake from 'react-native-shake';

import lightOff from './assets/img/eco-light-off.png';
import lightOn from './assets/img/eco-light-on.png';
import pSolutions from './assets/img/powerSolutions.png';
import pSolutionsLight from './assets/img/powerSolutions-light.png';

//Colors
const colorBgLight = 'white';
const colorBgDark = 'black';

const App = () => {
  const [toggleDark, setToggle] = useState(false);
  
  // boa pratica, deixar a funcao fora
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);
  
  // Liga lanterna do celular
  useEffect(() => {
    Torch.switchState(toggleDark);
  },[toggleDark])

  useEffect(() => {
    const subscription = RNSkake.addListener(() => {
      handleChangeToggle();
    });
    // para remover o evento criado com o shake
    return () => subscription.remove();
  },[])
   
  return (
    <View style={toggleDark ? styles.sectionContainer : styles.sectionContainerLight} >
      <TouchableOpacity 
        onPress={handleChangeToggle}>
          <Image style={toggleDark ? [styles.lighting, styles.lightingOn] : styles.lighting}
            source={toggleDark ? lightOff : lightOn} />
          <Image style={styles.pSolutions}
            source={toggleDark ? pSolutionsLight : pSolutions} />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: colorBgDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainerLight: {
    flex: 1,
    backgroundColor: colorBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lighting: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOn: {
    tintColor: 'white',
  },
  pSolutions: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
