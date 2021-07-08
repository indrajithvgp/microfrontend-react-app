import React, {lazy, Suspense, useState, useEffect} from 'react'
import {Route, Switch, Router, Redirect} from 'react-router-dom'
// import MarketingApp from './components/MarketingApp'
// import AuthApp from './components/AuthApp'
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles'
import {createBrowserHistory} from 'history'
import Header from './components/Header'
import Progress from './components/Progress'

const MarketingLazy = lazy(()=> import('./components/MarketingApp'))
const AuthLazy = lazy(()=> import('./components/AuthApp'))
const DashboardLazy = lazy(()=> import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default() => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const history = createBrowserHistory()
    const onSignOut = ()=> setIsSignedIn(false)

    useEffect(()=>{
        if(!isSignedIn) {
            history.push('/dashboard')
        }
    }, [isSignedIn])

    return (
        <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
            <div>
                <Header signedIn={isSignedIn} onSignOut={onSignOut}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path="/auth" exact>
                            <AuthLazy onSignIn={()=> setIsSignedIn(true)}/>
                        </Route>
                        <Route path="/dashboard" exact >
                            {!isSignedIn && <Redirect to="/"/>}
                            <DashboardApp/>
                        </Route>
                        <Route path="/" component={MarketingLazy} />
                    </Switch>
                </Suspense>
            </div>
        </Router>
        </StylesProvider>
    )
}


