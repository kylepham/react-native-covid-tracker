import React, { useContext, useState, useEffect, Fragment } from 'react'
import { Button } from 'react-native-paper'
import { StyleSheet, View, Animated, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'

import { fetchStates } from '../assets/api'

import { DataContext } from './context'

export default function Select({ country, isUSA, state, countries, selecting, selectingState }) {
	const opacityBG = useState(new Animated.Value(0))[0]
	const opacityFLC = useState(new Animated.Value(0))[0]
	const opacityFLS = useState(new Animated.Value(0))[0]
	const [z, setZ] = useState(-1)
	const [stateZ, setStateZ] = useState(-1)
	const [statesList, setStatesList] = useState([])

	const { countryChange, countryRetrieve, stateChange, stateRetrieve, triggerSelect, triggerSelectState, } = useContext(DataContext)

	const countriesList = countries ? [
		{
			id: -1,
			title: 'Global',
		},
		...countries.map((c, id) => ({
			id,
			title: c,
		}))
	] : [{ id: -69, title: null }]


	useEffect(() => {
		if (selecting)
			fadeIn()
		else 
			setZ(-1)
	}, [selecting, country])

	useEffect(() => {
		if (selectingState)
			fadeIn()
		else 
			setStateZ(-1)
	}, [selectingState, country])

	useEffect(() => {
		if (isUSA)
			(async () => {
				try {
					setStatesList([
						{ id: -1, title: 'All states' }, 
						...(await fetchStates()).map((s, id) => ({
							id,
							title: s,
						}))
					])
				} catch(error) {
					setStatesList([])
				}
			})()
		else
			setStatesList([])
	}, [isUSA])

	const fadeIn = () => {
		if (selecting) {
			setZ(3);
			Animated.timing(opacityFLC, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start()
		}
		else if (selectingState) {
			setStateZ(3);
			Animated.timing(opacityFLS, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start()
		}
		Animated.timing(opacityBG, {
			toValue: .2,
			duration: 500,
			useNativeDriver: true,
		}).start()
	}

	const fadeOut = () => {
		Animated.timing(opacityBG, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start()
		if (selecting)
			Animated.timing(opacityFLC, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start()
			else if (selectingState)
			Animated.timing(opacityFLS, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start()

	}

	const onSelectBackgroundPress = () => {
		fadeOut(); 
		triggerSelect(false); 
		triggerSelectState(false);
	}

	const onItemPress = (pressedItem) => {
		fadeOut(); 
		triggerSelect(false); 
		triggerSelectState(false);
		if (selecting) {
			if (pressedItem === country) {
				if (state)
					stateRetrieve(state)
				else
					countryRetrieve(country);
			}
		else
			countryChange(pressedItem);
		} else if (selectingState) {
			if (pressedItem === state)
				stateRetrieve(pressedItem)
			else
				stateChange(pressedItem);
		}
	}

	return (
		<Fragment>
			<View style={[styles.selectContainer, { zIndex: z }]}>
				<Animated.View style={[styles.selectBackgroundContainer, { opacity: opacityBG }]}>
					<TouchableOpacity style={styles.selectBackground} onPress={onSelectBackgroundPress}>
					</TouchableOpacity>
				</Animated.View>
				<Animated.View style={[styles.selectList, { zIndex: z, opacity: opacityFLC }]}>
					<OptimizedFlatList data={countriesList} renderItem={({ item }) => <Button mode={item.title === country ? 'contained' : 'text'} color='#4383D2' onPress={() => { onItemPress(item.title) }}>{item.title}</Button>} keyExtractor={(item, id) => id.toString()} initialNumToRender={30} disableVirtualization={false} />
				</Animated.View>
			</View>

			<View style={[styles.selectContainer, { zIndex: stateZ }]}>
				<Animated.View style={[styles.selectBackgroundContainer, { opacity: opacityBG }]}>
					<TouchableOpacity style={styles.selectBackground} onPress={onSelectBackgroundPress}>
					</TouchableOpacity>
				</Animated.View>
				<Animated.View style={[styles.selectList, { zIndex: stateZ, opacity: opacityFLS }]}>
					<OptimizedFlatList data={statesList} renderItem={({ item }) => <Button mode={item.title === state ? 'contained' : 'text'} color='#4383D2' onPress={() => { onItemPress(item.title) }}>{item.title}</Button>} keyExtractor={(item, id) => id.toString()} initialNumToRender={30} disableVirtualization={false} />
				</Animated.View>
			</View>
		</Fragment>
	)
}

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
	selectBackground: {
		position: 'absolute', 
		backgroundColor: 'black', 
		width: '100%', 
		height: '100%', 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	selectBackgroundContainer: {
		width: '100%',
		height: '100%',
	},	
	selectContainer: {
		position: 'absolute', 
		width, 
		height, 
		justifyContent: 'center',
		alignItems: 'center'
	},
	selectList: {
		position: 'absolute', 
		height: '75%',
		width: '75%',
		backgroundColor: 'white', 
		borderRadius: 10
	},
})
