import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Card from './Card'

import { DataContext } from './context'
import { Images } from '../assets/constants'

export default function ConfirmedCard({ cases, todayCases, yesterdayCases }) {

	const { format } = useContext(DataContext)
	return (
		<View style={styles.container}>
			<Card color={['#35C90A', '#EDFBE8']} image={Images.confirmed} name='Confirmed' today={format(cases)} todayNum={format(todayCases)} yesterdayNum={format(yesterdayCases)} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: '100%',
	},
})
