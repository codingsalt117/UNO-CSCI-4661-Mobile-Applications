import React from 'react';
import { Text, View, StyleSheet} from 'react-native'

const ScoreBox = (props) => {
    return <View>
        <View style={styles.scorebox}>
            <View style={styles.scores}>
                <View>
                    <Text>Hunt Score</Text>
                </View>
                <View>
                    <Text>6942</Text>
                </View>
            </View>
            <View style={styles.scores}>
                <View>
                    <Text>Hunt Time</Text>
                </View>
                <View>
                    <Text>3:50</Text>
                </View>
            </View>
            <View style={styles.scores}>
                <View>
                    <Text>Distance Traveled</Text>
                </View>
                <View>
                    <Text>0.0000123m</Text>
                </View>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    caches: {
        height: 300,
    },
    scorebox: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    scores: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 3
    }
});

export default ScoreBox
