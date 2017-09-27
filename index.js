import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Camera from 'react-native-camera';
import RNTesseractOcr from 'react-native-tesseract-ocr';


const test = require('asset:/tessdata/eng.traineddata');

export default class ocrTest extends Component {

  constructor () {
    super();

    this.state = {
      ocrResult: null,
    };
  }

  getText = (response) => {

    debugger;

    RNTesseractOcr.startOcr(response.path.replace('file://',''), 'LANG_ENGLISH')
      .then((result) => {
        debugger
        this.setState({ ocrResult: result });
        console.log("OCR Result: ", result);
      })
      .catch((err) => {
        debugger;
        console.log("OCR Error: ", err);
      })
      .done();
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then(this.getText)
      .catch(err => console.error(err));
  }

  render () {

    const { ocrResult } = this.state;

    return (
      <View style={styles.container}>
        {ocrResult ? (
          <Text>
            {ocrResult}
          </Text>
        ) : ( 
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
          >
            <TouchableOpacity onPress={this.takePicture.bind(this)}>
              <Text style={styles.capture}>[CAPTURE]</Text>
            </TouchableOpacity>
          </Camera>
        ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
