import React,{FC} from 'react';
import LayersViewer from "./components/viewers/LayersViewer";
import LoginDialog from "./components/common/LoginDialog";

interface AppProps {

}
const App :FC<AppProps>=props =>  {
  return (
    <div className="App">
      <LayersViewer/>
      <LoginDialog/>
    </div>
  );
};

export default App;
