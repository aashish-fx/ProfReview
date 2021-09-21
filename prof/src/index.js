
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';

import App from './App';
//import reactDom from 'react-dom';
//const store = createStore(reducers,compose(applyMiddleware(thunk)));
ReactDOM.render(
   
       <BrowserRouter>
          <App />
       </BrowserRouter>
   
    , document.getElementById('root'));