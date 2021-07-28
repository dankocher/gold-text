import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Animated, Image, ScrollView} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import gradient from '../../assets/gradient.png';
import MaskedView from "@react-native-masked-view/masked-view";

const {width, height } = Dimensions.get('window');

export default function GoldView() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const left = useRef(new Animated.Value(0)).current;
    const top = useRef(new Animated.Value(0)).current;
    const [subscription, setSubscription] = useState(null);

    const _slow = () => {
        Accelerometer.setUpdateInterval(1000);
    };

    const _fast = () => {
        Accelerometer.setUpdateInterval(16);
    };

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setData(accelerometerData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        Animated.parallel([
            Animated.timing(top, {
                toValue: (height - Math.abs(data.y * height) - height / 2) * 2,
                duration: 50,
                useNativeDriver: false
            }),
            Animated.timing(left, {
                toValue: Math.abs(data.x * width) - width/2,
                duration: 50,
                useNativeDriver: false
            })
        ]).start();
    }, [data])

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = data;
    return (
        <View style={styles.container}>
            <MaskedView
                style={{ flex: 1, flexDirection: 'row', height: '100%' }}
                maskElement={
                    <View
                        style={{
                            // Transparent background because mask is based off alpha channel.
                            backgroundColor: 'transparent',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                            <Text style={styles.gold}>METAMODERN</Text>
                    </View>
                }
            >
                {/* Shows behind the mask, you can put anything here, such as an image */}
                <View style={{ flex: 1, height: '100%', backgroundColor: '#ACA679' }} >
                    <Animated.View style={[styles.circle, {
                        left, top
                    }]}>
                        <Image style={styles.gradient} source={gradient}/>
                    </Animated.View>
                </View>
            </MaskedView>
            {/*<View style={{position: 'absolute', bottom: 0}}>*/}
            {/*    <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>*/}
            {/*    <Text style={styles.text}>*/}
            {/*        x: {round(x)}*/}
            {/*    </Text>*/}
            {/*    <Text style={styles.text}>*/}
            {/*        y: {round(y)}*/}
            {/*    </Text>*/}
            {/*    <Text style={styles.text}>*/}
            {/*        z: {round(z)}*/}
            {/*    </Text>*/}
            {/*</View>*/}

            {/*<Animated.View style={[styles.circle, {*/}
            {/*    left, top*/}
            {/*}]}>*/}
            {/*    <Image style={styles.gradient} source={gradient}/>*/}
            {/*</Animated.View>*/}
        </View>
    );
}

function round(value) {
    // return parseInt(value * 100);
    return value
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width
    },
    text: {

    },
    buttonContainer: {

    },
    middleButton: {

    },
    circle: {
        // backgroundColor: 'red',
        width: 512,
        height: 512,
        position: 'absolute'
    },
    gold: {
        height: 60,
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#ACA679"
    },
    gradient: {
        width: 512,
        height: 512
    }
})
