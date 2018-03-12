import * as React from 'react';
import {Expression, Operand} from "../model/Expression";
import {Operator} from "../model/Operator";
import {observer} from "mobx-react";
import ExpressionStore from "../state/ExpressionStore";
import {computeNewOperandValue, typeOfOperand} from "../util/OperandUtils";

export interface ExpressionBlockProps { expression: Expression; store: ExpressionStore }

@observer
export class ExpressionBlock extends React.Component<ExpressionBlockProps, {}> {
    constructor(props: ExpressionBlockProps) {
        super(props);
    }

    handleLeftOperandChange  = (event: any) => {
        this.props.expression.leftOperand = computeNewOperandValue(event);
        this.props.store.changeExpressionState();
    };

    handleRightOperandChange = (event: any) => {
        this.props.expression.rightOperand = computeNewOperandValue(event);
        this.props.store.changeExpressionState();
    };

    handleOperatorChange = (event : any) => {
        const newValue = event.target.value;
        console.debug("New operand value: " + newValue);
        this.props.expression.operator = newValue;
        this.props.store.changeExpressionState();
        //TODO ETO: changeExpessionState shouldnt be expliitly called..
    };

    handleLeftOperandKeyUp = (event: any) => {
        this.props.expression.leftOperand = event.target.value;
        this.props.store.changeExpressionState();
    };

    handleRightOperandKeyUp = (event: any) => {
        this.props.expression.rightOperand = event.target.value;
        this.props.store.changeExpressionState();
    };

    createEditValueJsx(operand: Operand, isLeftOperand: boolean): string {
        const operandType = typeOfOperand(operand);
        if (operandType === "string") {
            console.debug("in createEditValueJsx, operandtype = string");
            return (<input onKeyUp={isLeftOperand ? this.handleLeftOperandKeyUp : this.handleRightOperandKeyUp}/>)
        } else if (operandType === "expression") {
            console.debug("in createEditValueJsx, operandtype = expression");
            return (<div className="indented" >
                <br/>
                <ExpressionBlock expression={operand} store={this.props.store}/>
            </div>)
        } else {
        return ""
        }
    }

    render() {
        const expression = this.props.expression;
        console.debug({expression});

        const leftOperandType = typeOfOperand(expression.leftOperand);
        const rightOperandType = typeOfOperand(expression.rightOperand);
        const leftOperandEditValueJsx = this.createEditValueJsx(expression.leftOperand, true)
        const rightOperandEditValueJsx = this.createEditValueJsx(expression.rightOperand, false)

        return <div><select value={leftOperandType} onChange={this.handleLeftOperandChange}>
                <option value="none">Select Operand</option>
                <option value="string">String</option>
                <option value="expression">Expression</option>
            </select>
            {leftOperandEditValueJsx}
            <br/>
            <select value={expression.operator} onChange={this.handleOperatorChange}>
                <option value={Operator.NONE}>Select Operator</option>
                <option value={Operator.AND}>AND</option>
                <option value={Operator.OR}>OR</option>
            </select>
            <br/>
            <select value={rightOperandType} onChange={this.handleRightOperandChange}>
                <option value="none">Select Operand</option>
                <option value="string">String</option>
                <option value="expression">Expression</option>
            </select>
            {rightOperandEditValueJsx}</div>;
    }
}