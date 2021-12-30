import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';



import {Provider} from './context/context';

import App from './App';
import './index.css';

ReactDOM.render(
    <SpeechProvider appId="e9d7552c-12af-4440-b403-b279f9d88e5a" language="en-US">
        <Provider>
        <App />
        </Provider> 
    </SpeechProvider>,
    document.getElementById('root')
);