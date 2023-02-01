import React from 'react';
import {render,hydrate} from 'react-dom';
import './index.css';
import './styles/App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from "./store/configureStore";
import { Provider } from 'react-redux';
import Privacy from "./components/common/Privacy"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ContactPage} from "./components/controls/ContactSupportTool";
import NumberViewer from "./components/viewers/NumberViewer";
const reload = () => window.location.reload();
const rootElement = document.getElementById("root");
const Application = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/privacy" component={Privacy} />
                <Route path="/contacts" component={ContactPage} />
                <Route path="/robots.txt" onEnter={reload}/>
                <Route path={'/:id'} exact={true} component={NumberViewer} />
                <Route exact={true} path='/' component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>
)
if (rootElement) {
    if (rootElement.hasChildNodes()) {
        hydrate(Application, rootElement);
    } else {
        render(Application, rootElement);
    }
}

// ReactDOM.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <Switch>
//                 <Route path="/privacy" component={Privacy} />
//                 <Route path="/contacts" component={ContactPage} />
//                 <Route path="/robots.txt" onEnter={reload}/>
//                 <Route path={'/:id'} exact={true} component={NumberViewer} />
//                 <Route exact={true} path='/' component={App}/>
//             </Switch>
//         </BrowserRouter>
//     </Provider>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
