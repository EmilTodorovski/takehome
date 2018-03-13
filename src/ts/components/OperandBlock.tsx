import * as React from 'react';
import ExpressionStore from "../state/ExpressionStore";
import {Operand} from "../model/Expression";
import {observer} from "mobx-react";
import {computeNewOperandValue, typeOfOperand} from "../util/OperandUtils";
import {ExpressionBlock} from "./ExpressionBlock";
import {OperandType} from "../model/OperandType";

export interface OperandBlockProps {
    operand: Operand;
    store: ExpressionStore;
    path: string[];
}

@observer
export class OperandBlock extends React.Component<OperandBlockProps, {}> {
    constructor(props: OperandBlockProps) {
        super(props);
    }

    handleOperandChange = (event: any) => {
        const newValue = computeNewOperandValue(event)
        this.props.store.editField(this.props.path, newValue);
    };

    handleInputStringKeyUp = (event: any) => {
        this.props.store.editField(this.props.path, event.target.value);
    };

    createEditValueJsx(operand: Operand): string {
        const operandType = typeOfOperand(operand);
        if (operandType === OperandType.STRING) {
            return (<input onKeyUp={this.handleInputStringKeyUp}/>)
        } else if (operandType === OperandType.EXPRESSION) {
            return (<div className="indented">
                <ExpressionBlock expression={operand} store={this.props.store} path={this.props.path}/>
            </div>)
        } else {
            return ""
        }
    }

    render() {
        console.log("Operand path: " + this.props.path)
        const operand = this.props.operand;
        const operandType = typeOfOperand(operand);
        const operandEditValueJsx = this.createEditValueJsx(operand);

        return <div><select value={operandType} onChange={this.handleOperandChange}>
            <option value={OperandType.NONE}>Select Operand</option>
            <option value={OperandType.STRING}>String</option>
            <option value={OperandType.EXPRESSION}>Expression</option>
        </select>
            {operandEditValueJsx}
        </div>;
    }
}