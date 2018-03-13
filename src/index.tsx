import './index.css';
import * as React from 'react';
import {render} from 'react-dom';

import {Output} from './ts/components/Output'
import {Workspace} from "./ts/components/Workspace";
import ExpressionStore from './ts/state/ExpressionStore'

class RootComponent extends React.Component {

  render() {
      const expressionStore = new ExpressionStore();
      return <div className="root">
          <Workspace store={expressionStore}/>
          <Output store={expressionStore}/>
      </div>;
  }
}

render(<RootComponent />, document.getElementById('main'));