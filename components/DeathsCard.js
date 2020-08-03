import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Card from './Card'
import { Images } from '../assets/constants'

import { DataContext } from './context'

export default function DeathsCard({ deaths, todayDeaths, yesterdayDeaths }) {
	const { format } = useContext(DataContext)

	return (
		<View style={styles.container}>
			<Card color={['#E64C4C', '#FACDCD']} image={Images.deaths} name='Deaths' today={format(deaths)} todayNum={format(todayDeaths)} yesterdayNum={format(yesterdayDeaths)} />	
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
	},
})
