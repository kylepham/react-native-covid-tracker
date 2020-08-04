import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

import { DataContext } from './context'
import { Images } from '../assets/constants'

export default function SelectButton({ internetConnection ,country, state, country2ISO2 }) {
	const { flagOf, stateChange, triggerSelect, triggerSelectState } = useContext(DataContext)


	useEffect(() => {
		if (country === 'USA')
			stateChange('All states')
		else 
			stateChange(null)
	}, [country])

	onPress = () => {
		if (!internetConnection)
			return

		triggerSelect(true)
	}

	return (
		<View style={styles.container}>
			<TouchableRipple style={styles.button} onPress={onPress}>
				<View style={styles.buttonContent}>
					<Text>{country}</Text>
					{(country === 'Global' || country2ISO2[country]) && <Text> </Text>}	
					{(country === 'Global' || country2ISO2[country]) && <Image style={{ width: 15, height: 15 }} source={country === 'Global' ? Images.globe : { uri: flagOf(country2ISO2[country]) }} />}
				</View>
			</TouchableRipple>

			{state && 
				<TouchableRipple style={styles.button} onPress={() => triggerSelectState(true)}>
					<View style={{ alignItems: 'center' }}>
						<Text>{state}</Text>
					</View>
				</TouchableRipple>
			}

		</View>
	)
}

const { height } = Dimensions.get('screen')
const heightSelect = height * .05
const heightContainer = heightSelect * 5

const styles = StyleSheet.create({
	button: {
		height: heightSelect,
		marginTop: heightContainer - heightSelect / 2,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: 'white',
		borderColor: '#C9CDD2',
		borderWidth: .5,
		borderRadius: 23,
		zIndex: 1,
		justifyContent: 'center',	
		shadowOffset:{  width: 0,  height: 3,  },
		shadowColor: 'black',
		shadowOpacity: .25,
		elevation: 6,
	},
	buttonContent: {
		alignItems: 'center',
		flexDirection: 'row', 
	},
	container: {
		position: 'absolute',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%'
	}
})
