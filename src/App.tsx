import React,{FC} from 'react';
import LayersViewer from "./components/viewers/LayersViewer";

interface AppProps {

}

const App :FC<AppProps>=props =>  {
  return (
    <div className="App">
      <LayersViewer/>
    </div>
  );
};

export default App;
