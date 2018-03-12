import * as React from 'react';
import ExpressionStore from "../state/ExpressionStore";
import {Expression, Operand} from "../model/Expression";
import {observer} from "mobx-react";

export interface OperandBlockProps { operand: Operand; store: ExpressionStore }

@observer
export class OperandBlock extends React.Component<OperandBlockProps, {}> {

    handleOperandChange  = (event: any) => {
        const eventValue = event.target.value;
        console.debug("Changed dropdown value: " + eventValue);
        let newValue;
        if (eventValue === "none" ) {
            newValue = undefined;
        } else if (eventValue === "string") {
            newValue = "";
        } else if (eventValue === "expression") {
            newValue = new Expression();
        }
        console.debug("New operand value" + newValue);
        this.props.operand = newValue;
        this.props.store.changeExpressionState();
    };

    typeOfOperand(operand: Operand): string {
        if (operand === undefined || operand === null) {
            return "none"
        } else if (typeof operand === "string") {
            return "string"
        } else{
            return "expression"
        }
    }

    render() {
        const operandType = this.typeOfOperand(this.props.operand);

        return <div><select value={operandType} onChange={this.handleOperandChange}>
            <option value="none">Select Operand</option>
            <option value="string">String</option>
            <option value="expression">Expression</option>
        </select>

        </div>;
        //<input onkeyup="peopleStore[1].name = event.target.value" />
    }
}