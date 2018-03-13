import {computed, observable} from 'mobx';
import {Expression, Operand} from "../model/Expression";
import {Operator} from "../model/Operator";

export default class ExpressionStore {

    @observable expression: Expression = new Expression([]);

    @computed get createResultQuery(): string {
        return this.translateExpression(this.expression);
    }

    editField(path: string[], value: Operand | Operator) {
        this.expression = this.createUpdatedExpression(path, value, this.expression);
    }

    private createUpdatedExpression(path: string[], value: Operand | Operator, expression: Expression): Expression {
        let newExpression;
        const pathToEdit = path[0];
        
        if (path.length === 1) {
            newExpression = Object.assign({}, expression);
            newExpression[pathToEdit] = value;
        } else {
            const remainingPath = path.slice(1);
            newExpression = Object.assign({}, expression);
            newExpression[pathToEdit] = this.createUpdatedExpression(remainingPath, value, expression[pathToEdit])
        }
        return newExpression;

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