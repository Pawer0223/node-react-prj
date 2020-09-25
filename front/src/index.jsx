import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './reducer'
import DemoApp from './DemoApp'
import './main.css'
import App from "./router"

let store = createStore(rootReducer, applyMiddleware(thunk))

document.addEventListener('DOMContentLoaded', function() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})