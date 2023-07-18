import React from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CustomMarker from "./customMarker";
import { defaultDelta, MapTypes } from "./const";
import SlidingUpPanel from 'rn-sliding-up-panel';
import { MARKERS_DATA } from "./markersData";
import styles from "./styles/app";
import Animated from "react-native-reanimated";
import BottomSheet from './BottomSheet';
import Chats from './Chats';
import * as Location from "expo-location";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width: SCREEN_width, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App(props) {
  const latitudeDelta = 0.025
  const longitudeDelta = 0.025

  const [load, setLoad] = React.useState(true);
  const [detectNameRegion, setDetectNameRegion] = React.useState("")
  const [viewRegion, setViewRegion] = React.useState({
    latitudeDelta: null,
    longitudeDelta: null,
  })
  const [speed, setSpeed] = React.useState(0);
  const [pin, setPin] = React.useState({
    latitude: null,
    longitude: null,
  });

  const mapRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      let AdressViewMap = await Location.reverseGeocodeAsync(viewRegion.latitude ? viewRegion : {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
      })
      // console.log(AdressViewMap);
      setDetectNameRegion(AdressViewMap[0].city)

      if (load) {
        setLoad(false);
      }
    })();
  }, [viewRegion]);
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
  const { onPressLeft, titleLeft = "Chats" } = props;
  const { onPressRight, titleCenter = "Where I" } = props;
  const { onPressCenter, titleRight = "Settings" } = props;
  const ref = React.useRef(null);
  const ref1 = React.useRef(null);
  const onPress = React.useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-SCREEN_HEIGHT / 2.7);
    }
  }, []);
  const onChats = React.useCallback(() => {
    const isActive = ref1?.current?.isActive();
    if (isActive) {
      ref1?.current?.scrollTo(0);
    } else {
      ref1?.current?.scrollTo(-SCREEN_HEIGHT / 1);
    }
  }, []);
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        {load ? (
          <Text style={styles.loadText}>Loading...</Text>
        ) : (
          <>
            <MapView
              mapType={MapTypes.SATELLITEFLYOVER}
              ref={mapRef}
              style={{ ...styles.map, width: SCREEN_width }}
              onRegionChangeComplete={setViewRegion}
              initialRegion={{
                ...pin,
                ...defaultDelta,
              }}
              showsUserLocation={true}
              userInterfaceStyle="dark"
              // zoomTapEnabled={true}
              // tintColor='red'
              onUserLocationChange={(e) => {
                if (
                  e.nativeEvent.coordinate.latitude !== undefined ||
                  e.nativeEvent.coordinate.longitude !== undefined
                ) {
                  // console.log("onUserLocationChange", e.nativeEvent.coordinate);
                  setPin({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                  setSpeed(e.nativeEvent.coordinate.speed)
                } else {
                  // console.log(e.nativeEvent.coordinate);
                  // console.log("onUserLocationChange pass coordinate");
                }
              }}
            // onRegionChangeComplete={(pin) => setPin(pin)}
            >
              {/* <Marker pinColor="green" image={require("./svg/work4.png")} coordinate={homeSandr} title='Дом Сандра' /> */}
              {/* <Marker pinColor="blue" style={styles.marker} image={require("./svg/work4.png")} coordinate={homeIlya}  title='Дом Ильи' /> */}

              {MARKERS_DATA.map((marker) => (
                <CustomMarker
                  key={marker.id}
                  id={marker.id}
                  selectedMarker={null}
                  color={marker.color}
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  title={marker.title}

                >
                </CustomMarker>
              ))}
              <Marker style={styles.marker}
                onPress={onPress}
                coordinate={pin}
              >
                <TouchableOpacity
                  style={styles.touchMarker}
                  onPress={React.useCallback}
                >
                  <Text style={styles.textMarker}>{speed < 0 ? '0' : speed < 1 ? Math.ceil(speed) : speed.toFixed(0)} KM/H</Text>
                </TouchableOpacity>
              </Marker>
            </MapView>
            <View style={styles.markerFixed}>
              <Image style={styles.markerInvisible} />
            </View>
            {/* Кнопки по центру не удалять! */}
            <View style={styles.dolbaeb}>
              <TouchableOpacity style={styles.buttonCenter}
                activeOpacity={0.7}
                onPress={onChats}
              >
                <Text style={styles.text}>{titleLeft}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCenter}
                activeOpacity={0.7}
                onPress={goToHome}
              >
                <Text style={styles.text}>{titleCenter}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonCenter}
              >
                <Text style={styles.text}>{titleRight}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.regionView}>
              <View style={styles.regionBc}>
                <Text style={styles.regionTxt}>{detectNameRegion}</Text>
              </View>
            </View>
            {/* Кнопки по центру не удалять! */}

            {/* DONT СТИРАТЬ */}
            {/* <TouchableOpacity style={styles.button1} onPress={onPress} /> */}

            <BottomSheet ref={ref}>
              <View style={{ flex: 1, backgroundColor: 'white' }} />

            </BottomSheet>
            <Chats ref={ref1}>
              <View style={styles.allChat}>
                {MARKERS_DATA.map((marker) => (
                  <View style={styles.userChat} key={marker.id}>
                    <View style={styles.userImg}>
                      {/* <ImagesExample /> */}
                      <Image source={{ uri: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg' }}
                        style={{ width: 50, height: 50, borderRadius: 10, }}
                      />
                    </View>
                    <View style={styles.userNick}>
                      <Text style={styles.userNickTxt}>{marker.name}</Text>
                      <Text style={styles.userMsgTxt}>{marker.msg}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </Chats>

          </>
        )}
      </GestureHandlerRootView>

    </View>
  );
}
