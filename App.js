import React, { useState, useRef } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import * as tf from "@tensorflow/tfjs";
// import {Camera} from 'react-native-pytorch-core';

const App = () => {
  const runCoco = async () => {
    const net = await tf.loadGraphModel(process.env.PUBLIC_URL+'model.json');
    console.log("Model Loaded");
    setmodelLoaded(true);
    return net;
  }
  // const[modelLoaded,setmodelLoaded] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [predictionText, setPredictionText] = useState('');
  const textAreaRef = useRef(null);
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }  
  };
  const predictObject = async () => {
    /*
    if(!modelLoaded){
      const net = runCoco();
    }else{
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640.0,640.0])
      const casted = resized.cast('float32')
      // const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)
      console.log(obj) 
      const prediction = await obj[2].array();
      setPredictionText(prediction);
    }
     */
    setTimeout(() => {
      const prediction = "Hello";
      setPredictionText(prediction);
    }, 800);
  };
  const speakText = () => {
    console.log(predictionText);
    const thingToSay = '1';
    Speech.speak(predictionText);

  };
    
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Detect Object" onPress={predictObject} disabled={!imageUri} />
      <TextInput
        ref={textAreaRef}
        value={predictionText}
        onChangeText={setPredictionText}
        placeholder="Detected Text"
        multiline
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />
      <Button title="Speak Text" onPress={speakText} disabled={!predictionText} />
    </View>
  );
   /*
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hello World!!</Text>
      <Camera style={styles.camera} />
    </View>
  )*/
};

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#ffff',
//     padding: 20,
//     alignItems: 'center',
//   },
//   label: {
//     marginBottom: 10,
//   },
//   Camera: {
//     flexGrow: 1,
//     width: '100%',
//     color: '#000',
//   },
// });

export default App;
