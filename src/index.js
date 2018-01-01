//@flow
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './index.css'
import './colorPalette.css'
import './theme.css'
import reducer from './reducers'
import force from './middleware/force'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(force)))
const root = document.getElementById('root')
if (!root) {
  throw new Error("Couldn't find root element.")
}

const getPropertyValue = (property: string): ?string => {
  const element = document.documentElement
  if (element) {
    const style: CSSStyleDeclaration = getComputedStyle(element)
    return style.getPropertyValue(property).trim()
  }
}

const muiTheme: {} = getMuiTheme({
  palette: {
    primary1Color: getPropertyValue('--primary1-color'),
    primary2Color: getPropertyValue('--primary2-color'),
    primary3Color: getPropertyValue('--primary3-color'),
    accent1Color: getPropertyValue('--accent1-color'),
    accent2Color: getPropertyValue('--accent2-color'),
    accent3Color: getPropertyValue('--accent3-color'),
    textColor: getPropertyValue('--text-color'),
    secondaryTextColor: getPropertyValue('--secondary-text-color'),
    alternateTextColor: getPropertyValue('--alternate-text-color'),
    canvasColor: getPropertyValue('--canvas-color'),
    borderColor: getPropertyValue('--border-color'),
    disabledColor: getPropertyValue('--disabled-color'),
    pickerHeaderColor: getPropertyValue('--picker-header-color'),
    clockCircleColor: getPropertyValue('--clock-circle-color'),
    shadowColor: getPropertyValue('--shadow-color'),
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  root,
)
registerServiceWorker()
