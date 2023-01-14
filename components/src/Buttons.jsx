
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import styles from "../../styles/app";
import { useCallback, useRef, useState, useEffect } from "react";
import * as Location from "expo-location";

const ButtonBot = (props) => {
    const [pin, setPin] = useState({
        latitude: null,
        longitude: null,
      });
    const mapRef = useRef(null);
    const { onPressLeft, titleLeft = "Chats" } = props;
    const { onPressRight, titleCenter = "Click me" } = props;
    const { onPressCenter, titleRight = "Settings" } = props;
    const ref = useRef(null);
    const ref1 = useRef(null);
    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-SCREEN_HEIGHT / 2.7);
        }
    }, []);
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          // console.log(location);
          setPin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setLoad(false);
        })();
      }, []);
    const goToHome = () => {
        // console.log(1);
        mapRef.current.animateToRegion(
            {
                ...pin,
                ...defaultDelta,
            },
            2 * 300
        );
    };
    const onChats = useCallback(() => {
        const isActive = ref1?.current?.isActive();
        if (isActive) {
            ref1?.current?.scrollTo(0);
        } else {
            ref1?.current?.scrollTo(-SCREEN_HEIGHT / 1);
        }
    }, []);
    return (
        <View style={styles.dolbaeb}>
            <TouchableOpacity style={styles.buttonCenter}
                activeOpacity={0.7}
                onPress={onChats}>
                <Text style={styles.text}>{titleLeft}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonCenter}
                activeOpacity={0.7}
                onPress={goToHome}>
                <Text style={styles.text}>{titleCenter}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonCenter}

            // onPressRight={goToHome}
            >
                <Text style={styles.text}>{titleRight}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ButtonBot
