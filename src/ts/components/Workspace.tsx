import * as React from 'react';
import {ExpressionBlock} from "./ExpressionBlock";
import {observer} from "mobx-react";
import {ExpressionStore} from "../state/ExpressionStore";
import {OutputBlockProps} from "./Output";
export interface WorkspaceBlockProps { store: ExpressionStore; }

@observer
export class Workspace extends React.Component<WorkspaceBlockProps, {}> {

    render() {
        return <div className="input">
            Visual Expression Builder <br/>
           A This is where you put the little windows.
            <ExpressionBlock expression={this.props.store.expression} store={this.props.store}/>
        </div>;
    }
}