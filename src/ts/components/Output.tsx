import * as React from 'react';
import ExpressionStore from "../state/ExpressionStore";
import {observer} from "mobx-react";

export interface OutputBlockProps { store: ExpressionStore; }

@observer
export class Output extends React.Component <OutputBlockProps, {}> {

    render() {
        return <div className="output">
            Resulting query is: {this.props.store.createResultQuery}
            <br/>
        </div>
    }
}