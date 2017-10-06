// Reactotron
//   .configure({
//     host: '172.16.18.13',  // server ip
//   }) // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

import Reactotron, {
trackGlobalErrors,
openInEditor,
overlay,
asyncStorage,
networking
} from 'reactotron-react-native'

Reactotron
    .configure({
    name: 'Sample Project Collection',
    host: '172.16.16.143',
    })
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .connect();

//  host: '172.16.18.13',
//  host: '192.168.0.157',
Reactotron.clear();
   
if (__DEV__) {
    Reactotron.log('START');
}
