import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './assets/css/bootstrap.min.css';
import './assets/icons/lineawesome/css/line-awesome-font-awesome.min.css';
import './assets/icons/ionicons/css/ionicons.min.css';
import './assets/icons/font-awesome/css/font-awesome.min.css';
import './assets/icons/glyphicons/glyphicon.css';
import './assets/css/custom.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
