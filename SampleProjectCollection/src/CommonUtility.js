import { Platform } from 'react-native';
//import Reactotron from 'reactotron-react-native';

export default class Commons {
    
    static IsAndroid() {
        Reactotron.log(Platform.OS);
        if (Platform.OS === 'android')
            return true;
        else
            return false;
    }

    static IsIos() {
        if (Platform.OS === 'ios')
            return true;
        else
            return false;
    }

    static DetectPlatformVersion() {
        // if (Platform.Version === 25) {
        //     Reactotron.log('Running on Nougat!');
        // }

        return Platform.Version;
    }
}
