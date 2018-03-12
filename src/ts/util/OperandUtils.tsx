import {Expression, Operand} from "../model/Expression";

export function typeOfOperand(operand: Operand): string {
    if (operand === undefined || operand === null) {
        return "none"
    } else if (typeof operand === "string") {
        return "string"
    } else {
        return "expression"
    }
}

export function computeNewOperandValue(event: any): Operand {
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

