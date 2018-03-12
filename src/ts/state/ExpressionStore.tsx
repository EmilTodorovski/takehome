import {computed, observable} from 'mobx';
import {Expression, Operand} from "../model/Expression";
import {typeOfOperand} from "../util/OperandUtils";

export default class ExpressionStore {

    @observable expression: Expression = new Expression();

    @computed get createResultQuery(): string {
        return this.translateExpression(this.expression);
    }

    changeExpressionState() {
        this.expression = Object.assign({}, this.expression);
        this.changeExpressionStateWithExpression(this.expression)
    }


    changeExpressionStateWithExpression(expression: Expression) {
        if (typeOfOperand( expression.leftOperand) === "expression") {
            this.changeExpressionStateWithExpression(expression.leftOperand);
            expression.leftOperand = Object.assign({}, expression.leftOperand);
        }
        if (typeOfOperand( expression.rightOperand) === "expression") {
            this.changeExpressionStateWithExpression(expression.rightOperand);
            expression.rightOperand = Object.assign({}, expression.rightOperand);
        }

    }

    private translateExpression(expression: Expression): string {
        return "(" +
            this.translateOperand(expression.leftOperand) +
            " " +
            expression.operator +
            " " +
            this.translateOperand(expression.rightOperand)
            + ")";
    }

    private translateOperand(operand: Operand): string {
        if (operand === undefined || operand === null) {
            return "N/A";
        } else if (typeof operand === "string") {
            return "\"" + operand + "\"";
        } else {
            return this.translateExpression(operand);
        }
    }
}