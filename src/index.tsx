import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from "./store/configureStore";
import { Provider } from 'react-redux';
import Privacy from "./components/common/Privacy"
import {BrowserRouter, Route, Switch} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact={true} path='/' component={App}/>
                <Route path="/privacy" component={Privacy} />
                <Route path="/contacts" component={Privacy} />
            </Switch>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
