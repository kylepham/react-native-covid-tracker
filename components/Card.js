import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign' // unused, maybe icon for uparrow

const borderRad = 10

export default function Card({ color, image, imagePadding, name ,today, todayNum, yesterdayNum }) {
	return (
		<View style={styles.container}>
			<View style={[styles.highlightLine, { backgroundColor: color[0] }]}>
			</View>

			<View style={[styles.background, { backgroundColor: color[1] }]}>
				<View style={[styles.cardImage, { paddingRight: imagePadding ? imagePadding : 5, paddingTop: imagePadding ? imagePadding : 5 }]}>
					<Image source={image} style={{ width: imgSize, height: imgSize }} />
				</View>

				<Text style={styles.header}>{name}</Text>
				<View style={styles.statsTextNumbers}>
					<Text style={[styles.number, { fontSize: numSize }]}>{today}</Text>
					<View style={{ flexDirection: 'column' }}>
						<View style={{ justifyContent: 'flex-start' }}>
							{todayNum !== undefined && todayNum !== 0 && <Text style={{ fontSize: subNumSize }}>{` ↑${todayNum} today`}</Text>}
						</View>
						<View style={{ justifyContent: 'flex-end' }}>
							{yesterdayNum !== undefined && yesterdayNum !== 0 && <Text style={{ fontSize: subNumSize }}>{` ↑${yesterdayNum} yesterday`}</Text>}
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

const { width } = Dimensions.get('screen')
const numSize = width * .07
const headerSize = numSize - 12
const imgSize = numSize * 1.75
const subNumSize = numSize / 2.5

const styles = StyleSheet.create({
	background: {
		borderTopRightRadius: borderRad, 
		borderBottomRightRadius: borderRad,
		flex: 40, 
		padding: 15, 
		paddingTop: 10,
	},
	cardImage: {
		alignSelf: 'flex-end',
		opacity: .65, 
		position: 'absolute', 
	},
	container: {
		borderColor: '#C9CDD2',
		borderRadius: borderRad,
		flexDirection: 'row',
		width: '100%',
		marginTop: 10,
		marginBottom: 20,
		shadowOffset:{ width: 8,  height: 10 },
		shadowColor: 'black',
		shadowOpacity: .1,
		elevation: 6,
	},
	header: {
		fontSize: headerSize,
		paddingBottom: 10,
		textTransform: 'uppercase'
	},
	highlightLine: {
		borderTopLeftRadius: borderRad, 
		borderBottomLeftRadius: borderRad,
		flex: 1, 
		height: '100%',
		width: '100%', 
	},	
	number: {
		fontWeight: 'bold', 
		paddingVertical: 15,
	},
	statsTextNumbers: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 10,
	}
})
