import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import ConfirmedCard from './ConfirmedCard'
import RecoveredCard from './RecoveredCard'
import DeathsCard from './DeathsCard'
import CriticalCard from './CriticalCard'
import ActiveCard from './ActiveCard'

import { fetchYesterdayData, fetchYesterdayStateData } from '../assets/api'

export default function StatsCards({ internetConnection, country, state, cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical }) {
	const [yesterday, setY] = useState({})
	
	useEffect(() => {
		if (internetConnection)
			(async () => {
				if (!state)
					setY(await fetchYesterdayData(country))
				else
					setY(await fetchYesterdayStateData(state))
			})()
	}, [country, internetConnection, state])

	return (
		<View style={styles.container}>
			{cases !== null && cases !== undefined && <ConfirmedCard cases={cases} todayCases={todayCases} yesterdayCases={yesterday.cases} />}
			{recovered !== null && recovered !== undefined && <RecoveredCard recovered={recovered} todayRecovered={todayRecovered} yesterdayRecovered={yesterday.recovered} />}
			{deaths !== null && deaths !== undefined && <DeathsCard deaths={deaths} todayDeaths={todayDeaths} yesterdayDeaths={yesterday.deaths} />}
			{active !== null && active !== undefined && <ActiveCard active={active} />}
			{critical !== null && critical !== undefined && <CriticalCard critical={critical} />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: '87%'
	}
})
