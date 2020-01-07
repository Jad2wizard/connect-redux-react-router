import * as React from 'react'
import {Router} from 'react-router'
import {createBrowserHistory as createHistory, UnregisterCallback} from 'history'
import {ROUTE_CHANGE, getQuery, Props} from './utils'

const history = createHistory()

class BrowserRouter extends React.Component<Props, {}> {
	history = history
	unlisten: UnregisterCallback

	componentDidMount() {
		const {store} = this.props
		if (store && store.dispatch) {
			this.unlisten = this.history.listen((location, action) => {
				store.dispatch({
					type: ROUTE_CHANGE,
					payload: {
						...location,
						action,
						query: getQuery(location.search)
					}
				})
			})

			store.dispatch({
				type: ROUTE_CHANGE,
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
