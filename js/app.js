import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import './app.scss';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootSaga from './redux/saga';
import reducer from './redux/reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store ={store}>
        <Home/>
    </Provider>
,document.getElementById('container'));
