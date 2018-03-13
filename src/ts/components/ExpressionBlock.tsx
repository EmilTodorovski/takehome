import * as React from 'react';
import {Expression} from "../model/Expression";
import {Operator} from "../model/Operator";
import {observer} from "mobx-react";
import ExpressionStore from "../state/ExpressionStore";
import {OperandBlock} from "./OperandBlock";

export interface ExpressionBlockProps { expression: Expression; store: ExpressionStore; path: string[]; }

@observer
export class ExpressionBlock extends React.Component<ExpressionBlockProps, {}> {
    constructor(props: ExpressionBlockProps) {
        super(props);
    }

    handleOperatorChange = (event : any) => {
        let newPath = this.props.path.slice(0);
        newPath.push("operator");
        this.props.store.editField(newPath, event.target.value);
    };

    render() {
        console.debug("Path of expression block: " + this.props.path);

        const expression = this.props.expression;
        let leftPath = this.props.path.slice(0);
        leftPath.push("leftOperand");
        let rightPath = this.props.path.slice(0);
        rightPath.push("rightOperand");

        return <div>
            <OperandBlock
                operand={expression.leftOperand}
                store={this.props.store}
                path={leftPath}/>
            <select value={expression.operator} onChange={this.handleOperatorChange}>
                <option value={Operator.NONE}>Select Operator</option>
                <option value={Operator.AND}>AND</option>
                <option value={Operator.OR}>OR</option>
            </select>
            <OperandBlock
                operand={expression.rightOperand}
                store={this.props.store}
                path={rightPath}/>
        </div>;
    }
}