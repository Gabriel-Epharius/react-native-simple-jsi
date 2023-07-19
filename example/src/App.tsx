import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply } from 'react-native-simple-jsi';
import QRCodeScanner from 'react-native-qrcode-scanner';


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

  
  
  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <MyQRCodeScanner/>
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
});
