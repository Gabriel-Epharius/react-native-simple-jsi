import * as React from 'react';

import { 
  View,
  Text,
  SafeAreaView, 
  TouchableOpacity,
  StyleSheet } from 'react-native';


import { multiply } from 'react-native-simple-jsi';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera} from 'react-native-camera';

import  {PureComponent, useState} from 'react';


const MyQRCodeScanner: React.FC = () => {
  const onSuccess = (e: any) => {
    console.log(e.data);
    // e.data contains the QR code data
  };

  return (
    <QRCodeScanner onRead={onSuccess} />
  );
};

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();


  const fullCode = (): string | null => {
    if (checkAllEntries(circleColors)) {
      return slicedKey.join("");
    } else return null;
  };
  
  const changeCircleColor = (index: number, color: string): void => {
    const updateColors = [...circleColors];
    updateColors[index] = color;
    setCircleColors(updateColors);
  };
  
  const setRead = (index: number, value: boolean): void => {
    const updateReadeds = [...alreadyReaded];
    updateReadeds[index] = value;
    setReaded(updateReadeds);
  };
  
  function checkAllEntries(array: string[]): boolean {
    return array.every(function (entry) {
      return entry === "green";
    });
  }
  
  const handleBarcodeRead = (event: { data: string }): void => {
    if (event.data) {
      setBarcode(event.data);
      parseBarcode(event.data);
      // console.log(event.data);
    }
  };
  
  const parseBarcode = (data: string): void => {
    try {
      const indexSlice = parseInt(data[0]);
      const slice = data.substring(1);
      // console.log(indexSlice);
      // console.log(slice);
  
      if (alreadyReaded[indexSlice] !== true) {
        slicedKey[indexSlice] = slice;
        setRead(indexSlice, true);
        changeCircleColor(indexSlice, "green");
        // console.log(checkAllEntries(circleColors));
        // console.log(circleColors);
      }
    } catch (error) {
      console.log("Erro na identificação do index do QRCode lido.");
    }
  };
  
  const eraseKeySlice = (index: number): void => {
    if (index >= 0 || index < 6) {
      slicedKey[index] = "";
      changeCircleColor(index, "red");
      setRead(index, false);
    }
  
    // console.log(slicedKey[index]);
  };

  

  const [barcode, setBarcode] = useState(null);
  const [circleColors, setCircleColors] = useState(['red', 'red', 'red', 'red', 'red','red']);
  const [slicedKey, setSlicedKey] = useState(["1", "2", "3", "4", "5", "6"]);
  const [alreadyReaded, setReaded] = useState([false, false, false, false, false, false]);

  
  
  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (

    

    

    // <View style={styles.container}>
    //   <Text>Result: {result}</Text>

    //   <RNCamera
    //   style={styles.rnCamera}
    //   onBarCodeRead={handleBarcodeRead}>
    //   </RNCamera>


    // </View>

    <View style={styles.screen}>
    <SafeAreaView style={styles.saveArea}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitleText}>QRCode Merger</Text>
      </View>
    </SafeAreaView>

    <View style={styles.caption}>
      <Text style={styles.captionTitleText}>Welcome to ReactNative</Text>
    </View>

  <RNCamera
    style={styles.rnCamera}
    onBarCodeRead={handleBarcodeRead}>
  </RNCamera>

  <View style={styles.circleContainer}>
    {circleColors.map((color, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.circle, {backgroundColor: color}]}
        onPress = { () => eraseKeySlice(index)}
        />
    ))}
  </View>


    <View style={styles.cameraControl}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}> Voltar </Text>
      </TouchableOpacity>
    </View>

    

    {/* <ScrollView
      style={
        {
          maxHeight: 100,
          maxWidth: 350,
          alignContent: 'center'
        }
        
      }>
    {
      checkAllEntries(circleColors) ? 
      <Text>{fullCode()}</Text> : (
        <Text>NOT OK</Text>
      )
    }
    </ScrollView> */}
    

  </View>    


  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '##F2F2FC',
  },
  saveArea: {
    backgroundColor: '#62d1bc',
  },
  topBar: {
    height: 50,
    backgroundColor: '#62d1bc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleText: {
    color: '#ffffff',
    fontSize: 20,
  },
  caption: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionTitleText: {
    color: '#121B0D',
    fontSize: 16,
    fontWeight: '600'
  },
  btn: {
    width: 240,
    borderRadius: 2,
    backgroundColor: '#62d1bc',
    paddingVertical: 20,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginVertical: 8,
    marginTop: 30

  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  cameraControl: {
    marginTop: 0,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rnCamera: {
    flex: 1,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 50,
  },
  rnCameraResult: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#eeeeee',
  },
  rnCameraResultText: {
    fontSize: 20,
    color: '#621dbc',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'red',
    marginTop: 60,
    marginHorizontal: 5,
  },
});
