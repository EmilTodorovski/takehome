import {Expression, Operand} from "../model/Expression";
import {OperandType} from "../model/OperandType";

export function typeOfOperand(operand: Operand): OperandType {
    if (operand === undefined || operand === null) {
        return OperandType.NONE;
    } else if (typeof operand === "string") {
        return OperandType.STRING;
    } else {
        return OperandType.EXPRESSION;
    }
}

export function computeNewOperandValue(event: any): Operand {
    const eventValue = event.target.value;
    console.log(eventValue);
    let newValue;
    if (eventValue == OperandType.NONE ) {
        newValue = undefined;
    } else if (eventValue == OperandType.STRING) {
        newValue = "";
    } else if (eventValue == OperandType.EXPRESSION) {
        newValue = new Expression();
    }
    console.debug("New operand value: " + newValue);
    return newValue;
}

