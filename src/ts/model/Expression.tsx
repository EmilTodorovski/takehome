import {Operator} from "./Operator";

export type Operand = Expression | string;

export class Expression {
    constructor(){
        this.operator = Operator.NONE;
    }
    leftOperand?:Operand;
    operator?:Operator;
    rightOperand?:Operand;
}
