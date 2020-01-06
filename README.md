## connect-redux-react-router

This library can watch the router changing and dispatch a router change action which is the same as the routerAction exported by the library 'react-redux-router'.
You can also use the history exported by connect-redux-react-router to navigate outside the React Component

## Install

`npm install -D connect-redux-react-router`

## Usage

```
import React from 'react'
import {Route, Switch} from 'react-router'
import {BrowserRouter as Router} from 'connect-redux-react-router'
import {Provider} from 'react-redux'
import store from './store' // redux store instance

const App = () => {
    <div>
        <Router store={store}>
            <Route path='404'>
                <NotFoundPage/>
            </Route>
            <Layout>
                <Switch>
                    <Route path='/a'>
                        <A/>
                    </Route>
                    <Route path='/b'>
                        <B/>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    </div>
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
)
```

```
//demo-saga.js
import {browserHistory as history} from 'connect-redux-react-router'

function* test(){
    while(true){
        yield take('REQ_FETCH')
        yield call(fetch, '/something')
        history.push('/another-pathname')
    }
}
```
