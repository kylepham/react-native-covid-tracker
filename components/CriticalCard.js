import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Card from './Card'
import { Images } from '../assets/constants'


import { DataContext } from './context'

export default function CriticalCard({ critical }) {
	const { format } = useContext(DataContext)

	return (
		<View style={styles.container}>
			<Card color={['#FA9402', '#FFE5BF']} image={Images.critical} imagePadding={10} name='Critical' today={format(critical)} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
	},
	critical: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#FD9C25'
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
