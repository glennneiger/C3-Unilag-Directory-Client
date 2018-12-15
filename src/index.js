import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './assets/css/bootstrap.min.css';
import './assets/icons/lineawesome/css/line-awesome-font-awesome.min.css';
import './assets/icons/ionicons/css/ionicons.min.css';
import './assets/icons/font-awesome/css/font-awesome.min.css';
import './assets/icons/glyphicons/glyphicon.css';
import './assets/css/loading.css';
import './assets/css/loading-btn.css';
import './assets/css/custom.css';

import schoolReducer from './store/reducers/schoolReducer';
import churchReducer from './store/reducers/churchReducer';

const rootReducer = combineReducers({
    school: schoolReducer,
    church: churchReducer
});

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
