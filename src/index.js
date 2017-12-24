import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './index.css'
import reducer from './reducers'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
