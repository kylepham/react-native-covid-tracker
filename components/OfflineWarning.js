// source: https://medium.com/dailyjs/offline-notice-in-react-native-28a8d01e8cd0

import React from 'react'
import { StyleSheet, Text, Dimensions, SafeAreaView } from 'react-native'

export default function OfflineWarning() {
	return (
		<SafeAreaView style={styles.offlineContainer}>
			<Text style={styles.offlineText}>No Internet Connection</Text>
		</SafeAreaView>
	)
}

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
	offlineContainer: {
		backgroundColor: '#b52424',
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width,
		position: 'absolute',
		zIndex: 1,
	},
	offlineText: { 
		color: '#fff' 
	}
})
