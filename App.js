import React, { useEffect, useState, useMemo, useReducer, } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from 'react-native-splash-screen'

import MainScreen from './screens/MainScreen'

import { DataContext } from './components/context'
import { fetchData, fetchStateData, fetchCountries, fetchISO2 } from './assets/api'

export default function App() {
	const [countries, setCountries] = useState([])
	const [iso2, setISO2] = useState([])
	const [country2ISO2, setMap] = useState({})

	const initData = {
		internetConnection: true,
		cases: null, 
		todayCases: null,
		recovered: null,
		todayRecovered: null,
		deaths: null,
		todayDeaths: null,
		active: null,
		critical: null,
		updated: null, 
		isLoading: true,
		isSelecting: false,
		isSelectingState: false,
		isRefreshing: false,
		country: 'Global',
		state: null,
	}

	const dataReducer = (_state, action) => {
		switch (action.type) {
			case 'CONNECTION_CHANGE': 
				return {
					..._state,
					internetConnection: action.internetConnection,
				}
			case 'COUNTRY_CHANGE':
				return {
					...initData,
					country: action.country,
				}
			case 'COUNTRY_RETRIEVE':
				return {
					..._state,
					cases: action.cases,
					todayCases: action.todayCases,
					todayRecovered: action.todayRecovered,
					recovered: action.recovered,
					deaths: action.deaths,
					todayDeaths: action.todayDeaths,
					active: action.active,
					critical: action.critical,
					updated: action.updated,
					isRefreshing: action.isRefreshing,
					isLoading: false
				}
			case 'GET_ASYNCSTORAGE_NUMBERS':
				return {
					..._state,
					cases: action.cases,
					todayCases: action.todayCases,
					todayRecovered: action.todayRecovered,
					recovered: action.recovered,
					deaths: action.deaths,
					todayDeaths: action.todayDeaths,
					active: action.active,
					critical: action.critical,
					updated: action.updated,
				}
			case 'STATE_CHANGE':
				return {
					..._state,
					cases: null, 
					todayCases: null,
					recovered: null,
					todayRecovered: null,
					deaths: null,
					todayDeaths: null,
					active: null,
					critical: null,
					updated: null, 
					isLoading: true,
					state: action.state,
				}	
			case 'STATE_RETRIEVE':
				return {
					..._state,
					cases: action.cases,
					todayCases: action.todayCases,
					todayRecovered: action.todayRecovered,
					recovered: action.recovered,
					deaths: action.deaths,
					todayDeaths: action.todayDeaths,
					active: action.active,
					critical: action.critical,
					updated: action.updated,
					isRefreshing: action.isRefreshing,
					isLoading: false,
				}
			case 'TRIGGER_REFRESHING':
				return {
					..._state,
					isRefreshing: action.isRefreshing
				}
			case 'TRIGGER_SELECTING':
				return {
					..._state,
					isSelecting: action.isSelecting
				}
			case 'TRIGGER_SELECTING_STATE':
				return {
					..._state,
					isSelectingState: action.isSelectingState
				}
		}
	}

	const [dataState, dispatch] = useReducer(dataReducer, initData)

	const dataContext = useMemo(() => ({
		connectionChange: (internetConnection) => {
			dispatch({ type: 'CONNECTION_CHANGE', internetConnection: internetConnection.isConnected })
		},
		countryChange: (country) => {
			dispatch({ type: 'COUNTRY_CHANGE', country })
		},
		countryRetrieve: async (country) => {
			try {
				const { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated } = await fetchData(country)
				if (country === 'Global') {  // only store global's offline figures
					await AsyncStorage.setItem('@CovidTracker_cases', cases.toString())
					await AsyncStorage.setItem('@CovidTracker_todayCases', todayCases.toString())
					await AsyncStorage.setItem('@CovidTracker_recovered', recovered.toString())
					await AsyncStorage.setItem('@CovidTracker_todayRecovered', todayRecovered.toString())
					await AsyncStorage.setItem('@CovidTracker_deaths', deaths.toString())
					await AsyncStorage.setItem('@CovidTracker_todayDeaths', todayDeaths.toString())
					await AsyncStorage.setItem('@CovidTracker_active', active.toString())
					await AsyncStorage.setItem('@CovidTracker_critical', critical.toString())
					await AsyncStorage.setItem('@CovidTracker_updated', updated.toString())
				}
				dispatch({ type: 'COUNTRY_RETRIEVE', cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated, isRefreshing: false })
			} catch (error) {
				console.log(error)
			}
		},
		getAsyncStorageNumbers: async () => {
			try {
				const cases = await AsyncStorage.getItem('@CovidTracker_cases')
				const todayCases = await AsyncStorage.getItem('@CovidTracker_todayCases')
				const recovered = await AsyncStorage.getItem('@CovidTracker_recovered')
				const todayRecovered = await AsyncStorage.getItem('@CovidTracker_todayRecovered')
				const deaths = await AsyncStorage.getItem('@CovidTracker_deaths')
				const todayDeaths = await AsyncStorage.getItem('@CovidTracker_todayDeaths')
				const active = await AsyncStorage.getItem('@CovidTracker_active')
				const critical = await AsyncStorage.getItem('@CovidTracker_critical')
				const updated = parseInt(await AsyncStorage.getItem('@CovidTracker_updated'))
				dispatch({ type: 'GET_ASYNCSTORAGE_NUMBERS', cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated })
			} catch (error) {
				console.log(error)
			}
		},
		stateChange: (state) => {
			dispatch({ type: 'STATE_CHANGE', state })
		},
		stateRetrieve: async (state) => {
			if (!state)
				return;

			try {
				const { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated } = await fetchStateData(state)
				dispatch({ type: 'STATE_RETRIEVE', cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated, isRefreshing: false })
			} catch (error) {
				console.log(error)
			}
		},
		triggerRefresh: (isRefreshing) => {
			dispatch({ type: 'TRIGGER_REFRESHING', isRefreshing })
		},
		triggerSelect: (isSelecting) => {
			dispatch({ type: 'TRIGGER_SELECTING', isSelecting })
		},
		triggerSelectState: (isSelectingState) => {
			dispatch({ type: 'TRIGGER_SELECTING_STATE', isSelectingState })
		},
		triggerSelectCounty: (isSelectingCounty) => {
			dispatch({ type: 'TRIGGER_SELECTING_COUNTY', isSelectingCounty })
		},
		flagOf: (iso) => {
			return `https://disease.sh/assets/img/flags/${iso.toLowerCase()}.png`
		},
		format: (x) => {
			return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
		}
	}), [])

	useEffect(() => {
		NetInfo.addEventListener(dataContext.connectionChange)
	}, [])

	useEffect(() => {
		SplashScreen.hide()
	}, [])

	useEffect(() => {
		if (dataState.country === 'Global' && !dataState.internetConnection)
			dataContext.getAsyncStorageNumbers()
	}, [dataState.internetConnection])

	useEffect(() => {
		if (dataState.internetConnection)
			(async () => {
				setCountries(await fetchCountries())
			})()
	}, [dataState.internetConnection])

	useEffect(() => {
		if (dataState.internetConnection)
			(async () => {
				setISO2(await fetchISO2())
			})()
	}, [countries, dataState.internetConnection])

	useEffect(() => {
		if (countries) {
			let m = {}
			for (let i = 0; i < countries.length; i++)
				m[countries[i]] = iso2[i];
			setMap(m);
		}
	}, [iso2, countries])

	return (
		<DataContext.Provider value={dataContext}>
			<MainScreen data={dataState} countries={countries} country2ISO2={country2ISO2} />
		</DataContext.Provider>
	)
}

