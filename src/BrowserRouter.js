import React from 'react'
import {Router} from 'react-router'
import {createBrowserHistory as createHistory} from 'history'
import {ACTION_TYPE, getQuery} from './utils'

const history = createHistory()

class BrowserRouter extends React.Component {
	history = history
	unlisten = null

	componentDidMount() {
		const {store} = this.props
		if (store && store.dispatch) {
			this.unlisten = this.history.listen((location, action) => {
				store.dispatch({
					type: ACTION_TYPE,
					payload: {
						...location,
						action,
						query: getQuery(location.search)
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
