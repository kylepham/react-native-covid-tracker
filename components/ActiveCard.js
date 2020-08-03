import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Card from './Card'
import { Images } from '../assets/constants'


import { DataContext } from './context'

export default function ActiveCard({ active }) {
	const { format } = useContext(DataContext)

	return (
		<View style={styles.container}>
			<Card color={['#EAF609', '#FCFFC2']} image={Images.active} imagePadding={7} name='Active' today={format(active)} />
		</View>
	)
}

const styles = StyleSheet.create({
	active: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#F1E476',
	},
	container: {
		alignItems: 'center'
	},
	statsText: {
		fontSize: 26,
		fontWeight: 'bold',
	},
})
