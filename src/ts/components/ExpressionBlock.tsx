import * as React from 'react';
import {Expression, Operand} from "../model/Expression";
import {Operator} from "../model/Operator";
import {observer} from "mobx-react";
import ExpressionStore from "../state/ExpressionStore";

export interface ExpressionBlockProps { expression: Expression; store: ExpressionStore }

@observer
export class ExpressionBlock extends React.Component<ExpressionBlockProps, {}> {
    constructor(props: ExpressionBlockProps) {
        super(props);
    }

    typeOfOperand(operand: Operand): string {
        if (operand === undefined || operand === null) {
            return "none"
        } else if (typeof operand === "string") {
            return "string"
        } else{
            return "expression"
        }
    }

    computeNewOperandValue(event: any): Operand {
        const eventValue = event.target.value;
        console.log(eventValue);
        let newValue;
        if (eventValue === "none" ) {
            newValue = undefined;
        } else if (eventValue === "string") {
            newValue = "";
        } else if (eventValue === "expression") {
            newValue = new Expression();
        }
        console.debug("New operand value: " + newValue);
        return newValue;
    }

    handleLeftOperandChange  = (event: any) => {
        this.props.expression.leftOperand = this.computeNewOperandValue(event);
        this.props.store.changeExpressionState();
    };

    handleRightOperandChange = (event: any) => {
        this.props.expression.rightOperand = this.computeNewOperandValue(event);
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
        console.debug("IN createEditValueJsx !!!!!!!");
        const operandType = this.typeOfOperand(operand);
        if (operandType === "string") {
            console.debug("IN createEditValueJsx !!!!!!! string");
            return (<input onKeyUp={isLeftOperand ? this.handleLeftOperandKeyUp : this.handleRightOperandKeyUp}/>)
        } else if (operandType === "expression") {
            console.debug("IN createEditValueJsx !!!!!!! expression");
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

        const leftOperandType = this.typeOfOperand(expression.leftOperand);
        const rightOperandType = this.typeOfOperand(expression.rightOperand);
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