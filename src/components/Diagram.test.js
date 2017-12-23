import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Diagram from './Diagram'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MuiThemeProvider>
      <Diagram />
    </MuiThemeProvider>,
    div,
  )
})
