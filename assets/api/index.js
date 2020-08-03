import axios from 'axios'

const api = `https://disease.sh/v3/covid-19`

export const fetchData = async (country) => {
	let url = api;
	if (country !== 'Global')
		url = url + `/countries/${country}`
	else
		url = url + '/all'
	try {
		const { data: { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated } } = await axios.get(cacheBlock(url))
		return { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated }
	} catch(error) {

	}
}

export const fetchStateData = async (state) => {
	let url = api;
	if (state !== 'All states') {
		url = url + `/states/${state}`
		try {
			const { data: { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated } } = await axios.get(cacheBlock(url))
			return { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, active, critical, updated }
		} catch(error) {

		}
	}
	else
		return (await fetchData('USA'))
}

export const fetchYesterdayData = async (country) => {
	let url = api;
	if (country !== 'Global')
		url = url + `/countries/${country}`
	else
		url = url + '/all'
	try {
		const { data: { todayCases, todayRecovered, todayDeaths } } = await axios.get(cacheBlock(url) + '&yesterday=true')
		return { cases: todayCases, recovered: todayRecovered, deaths: todayDeaths }
	} catch(error) {

	}	
}

export const fetchYesterdayStateData = async (state) => {
	let url = api;	
	if (state !== 'All states') {
		url = url + `/states/${state}`
		try {
			const { data: { todayCases, todayRecovered, todayDeaths } } = await axios.get(cacheBlock(url) + '&yesterday=true')
			return { cases: todayCases, recovered: todayRecovered, deaths: todayDeaths }
		} catch(error) {

		}
	}
	else
		return (await fetchYesterdayData('USA'))
}

export const fetchCountries = async () => {
	let url = api + "/countries"
	try {
		const { data } = await axios.get(cacheBlock(url))
		return data.map(country => country.country)
	} catch(error) {

	}
}

export const fetchStates = async () => {
	let url = api + `/states`
	try {
		const { data } = await axios.get(cacheBlock(url))
		return data.map(state => state.state).sort()
	} catch(error) {

	}
}

export const fetchISO2 = async () => {
	let url = api + "/countries"
	try {
		const { data } = await axios.get(cacheBlock(url))
		const countryInfo = data.map(country => country.countryInfo)
		return countryInfo.map(info => info.iso2) 
	} catch(error) {

	}
}

const cacheBlock = url => (url + `?timestamp=${new Date().getTime()}`)