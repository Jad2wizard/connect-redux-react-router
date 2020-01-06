import React from 'react'
import {Router} from 'react-router'
import {createBrowserHistory as createHistory} from 'history'
import {ACTION_TYPE} from './utils'

const history = createHistory()

class BrowserRouter extends React.Component {
	history = history
	unlisten = null

	componentDidMount() {
		const {store} = this.props
		if (store && store.dispatch) {
			this.unlisten = this.history.listen((location, action) => {
				let query = location.search
				if (query) {
					const arr = query.slice(1).split('&')
					query = {}
					for (let item of arr) {
						query[item.split('=')[0]] = item.split('=')[1]
					}
				}
				store.dispatch({
					type: ACTION_TYPE,
					payload: {
						...location,
						action,
						query
					}
				})
			})

			store.dispatch({
				type: ACTION_TYPE,
				payload: {
					action: 'PUSH',
					query: {},
					...window.location
				}
			})
		}
	}

	componentWillUnmount() {
		this.unlisten && this.unlisten()
	}

	render() {
		return <Router history={this.history} children={this.props.children} />
	}
}

export {BrowserRouter, history}
