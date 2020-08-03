import React, { useEffect, useContext, Fragment } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';

import { DataContext } from '../components/context'
import { Images } from '../assets/constants'

import OfflineWarning from '../components/OfflineWarning'
import Select from '../components/Select'
import SelectButton from '../components/SelectButton'
import StatsCards from '../components/StatsCards'

export default function MainScreen({ data: { internetConnection, country, state, cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated, isSelecting, isSelectingState, isRefreshing }, countries, country2ISO2 }) {

	const { countryRetrieve, stateRetrieve, triggerRefresh } = useContext(DataContext)

	useEffect(() => {
		if (internetConnection)
			countryRetrieve(country)
	}, [country, internetConnection])

	useEffect(() => {
		if (internetConnection)
			stateRetrieve(state)
	}, [state, internetConnection])

	const onRefresh = () => {
		if (!internetConnection)
			return

		triggerRefresh(true)
		if (state)
			stateRetrieve(state)
		else
			countryRetrieve(country)
	}

	const lastUpdated = () => {
		const now = new Date()
		const then = new Date(updated)

		const dateNow = now.getDate()
		const monthNow = now.getMonth()
		const yearNow = now.getFullYear()
		const dateThen = then.getDate()
		const monthThen = then.getMonth()
		const yearThen = then.getFullYear()

		if (dateNow !== dateThen || monthNow !== monthThen || yearNow !== yearThen)
			return then.toLocaleDateString() + ' at ' + then.toLocaleTimeString()
		return 'Today at ' + then.toLocaleTimeString()
	}

	return (
		<Fragment>
			<SafeAreaView style={{ flex: 0, backgroundColor: 'black' }} />
			<SafeAreaView style={{ flex: 1, zIndex: 0 }} contentContainerStyle={{ flexGrow: 1 }}>
				<Select country={country} isUSA={country === 'USA'} state={state} countries={countries} selecting={isSelecting} selectingState={isSelectingState} />
				{!internetConnection && <OfflineWarning />}
				<ScrollView style={{ zIndex: 0, position: 'relative' }} refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
				}>
					<View style={styles.container}>
						<View style={styles.header}>
							<View style={{ flex: 3 }}>
								<View style={{ flexDirection: 'column', justifyContent: "space-between" }}>
									<View>
										<Text style={styles.headerText}>{country}</Text>
									</View>
									<Text style={{ color: 'white', fontSize: 10 }}>{`Last updated: ${cases ? lastUpdated() : `...Loading`}`}</Text>
								</View>
							</View>

							<View style={{ flex: 1 }}>
								<Animatable.Image animation='rotate' iterationCount='infinite' easing='linear' useNativeDriver={true} duration={10000} style={styles.virusLogo} source={Images.virus} />
							</View>
						</View>

						<SelectButton internetConnection={internetConnection} country={country} state={state} country2ISO2={country2ISO2} />

						{
							cases ? 
							<Animatable.View animation='fadeInUp' style={styles.statsContainer}>
								<View style={styles.statsInfo}>
									<StatsCards internetConnection={internetConnection} country={country} state={state} cases={cases} todayCases={todayCases} recovered={recovered} todayRecovered={todayRecovered} deaths={deaths} todayDeaths={todayDeaths} active={active} critical={critical} />
								</View>
							</Animatable.View> :
							<ActivityIndicator size='large' />
						}	
					</View>
				</ScrollView>
			</SafeAreaView>
		</Fragment>
	)
}

const { height } = Dimensions.get('screen')
const heightLogo = height * .1
const heightSelect = height * .05
const heightContainer = heightSelect * 5

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'relative',
	},
	header: {
		alignItems: 'center',
		backgroundColor: 'rgb(14, 14, 29)',
		flexDirection: 'row',
		height: heightContainer,
		justifyContent: 'space-between',
		marginBottom: 30,
		padding: 30,
		width: '100%',
	},
	headerText: {
		color: 'white',
		fontSize: 25,
		marginBottom: 10,
	},
	statsContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingBottom: 30,
	},
	statsInfo: {
		alignItems: 'center',
		width: '100%'
	},
	statsText: {
		fontSize: 26,
		fontWeight: 'bold',
	},
	virusLogo: {
		width: heightLogo,
		height: heightLogo,
	}

})