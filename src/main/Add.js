import * as React from 'react';

import {Text, View, SafeAreaView, StyleSheet} from 'react-native';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const Add = () => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {device != null && hasPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Add;

// export class Add extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       resourcePath: {},
//     };
//   }

//   selectFile = () => {
//     var options = {
//       title: 'Select Image',

//       customButtons: [
//         {
//           name: 'customOptionKey',

//           title: 'Choose file from Custom Option',
//         },
//       ],

//       storageOptions: {
//         skipBackup: true,

//         path: 'images',
//       },
//     };

//     launchImageLibrary(options, res => {
//       console.log('Response = ', res);

//       if (res.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (res.error) {
//         console.log('ImagePicker Error: ', res.error);
//       } else if (res.customButton) {
//         console.log('User tapped custom button: ', res.customButton);

//         alert(res.customButton);
//       } else {
//         let source = res;

//         this.setState({
//           resourcePath: source,
//         });
//       }
//     });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <Image
//             source={{
//               uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
//             }}
//             style={{width: 100, height: 100}}
//           />

//           <Image
//             source={{uri: this.state.resourcePath.uri}}
//             style={{width: 200, height: 200}}
//           />

//           <Text style={{alignItems: 'center'}}>
//             {this.state.resourcePath.uri}
//           </Text>

//           <TouchableOpacity onPress={this.selectFile} style={styles.button}>
//             <Text style={styles.buttonText}>Select File</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     padding: 30,

//     alignItems: 'center',

//     justifyContent: 'center',

//     backgroundColor: '#fff',
//   },

//   button: {
//     width: 250,

//     height: 60,

//     backgroundColor: '#3740ff',

//     alignItems: 'center',

//     justifyContent: 'center',

//     borderRadius: 4,

//     marginBottom: 12,
//   },

//   buttonText: {
//     textAlign: 'center',

//     fontSize: 15,

//     color: '#fff',
//   },
// });

// export default Add;
