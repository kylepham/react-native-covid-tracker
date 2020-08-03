import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Card from './Card'
import { Images } from '../assets/constants'

import { DataContext } from './context'

export default function RecoveredCard({ recovered, todayRecovered, yesterdayRecovered }) {
	const { format } = useContext(DataContext)

	return (
		<View style={styles.container}>
			<Card color={['#3481C9', '#D7E6F5']} image={Images.recovered} name='Recovered' today={format(recovered)} todayNum={format(todayRecovered)} yesterdayNum={format(yesterdayRecovered)} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
	},
	recovered: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#4179C6'
	},
	statsText: {
		fontSize: 26,
		fontWeight: 'bold',
	},
	statsTextNumbers: {
		flexDirection: 'row',
		alignItems: 'center',
	}
})
