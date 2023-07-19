import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply } from 'react-native-simple-jsi';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera} from 'react-native-camera';

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

  const handleBarcodeRead = (event) => {
    if (event.data) {
      // setBarcode(event.data);
      // parseBarcode(event.data);
      // console.log(event.data);
      console.log(event.data);
    }
  };

  
  
  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>

      <RNCamera
      style={styles.rnCamera}
      onBarCodeRead={handleBarcodeRead}>
      </RNCamera>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  rnCamera: {
    flex: 1,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 50,
  }
});
