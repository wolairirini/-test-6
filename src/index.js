import React from 'react';
import ReactDOM from 'react-dom';
import "./index.less";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import './mock';

// 全局axios设置
axios.defaults.baseURL = '';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
