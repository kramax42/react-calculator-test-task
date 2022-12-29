import { CALCULATOR_BUTTONS, KEYPAD_OPERATORS } from '@constants/calculator';
import { calculateExpression } from '@utils/expression-parser';

const operators = Object.values(KEYPAD_OPERATORS).join('');
const maxEntryLength = 16;

const toFullWideNumberString = (str) => {
  const num = Number(str);
  return num !== Infinity && num !== -Infinity
    ? num.toLocaleString('en-US', { useGrouping: false })
    : String(num);
};

export const calculatorHandler = ({ keypadValue, entry, expression }) => {
  const newState = {
    entry,
    expression,
    newHistoryItems: [],
  };

  const calculatorOperations = {
    [CALCULATOR_BUTTONS.equals]: () => {
      // Using cast entry to number for converting .3 to 0.3
      const newExpression =
        expression + (entry !== '' ? toFullWideNumberString(entry) : '');
      const newResult = calculateExpression(newExpression);

      const isDefiniteValues = (newExpression, newResult) => {
        return Boolean(
          newExpression !== '' &&
            newExpression !== newResult &&
            Number(newResult) !== Infinity &&
            !Number.isNaN(Number(newResult)),
        );
      };

      if (isDefiniteValues(newExpression, newResult)) {
        newState.newHistoryItems.push({
          calculatedExpression: `${newExpression} = ${newResult}`,
        });
      }
      newState.expression = '';
      newState.entry = toFullWideNumberString(newResult);
    },
    [CALCULATOR_BUTTONS.clean]: () => {
      newState.expression = '';
      newState.entry = '';
    },
    [CALCULATOR_BUTTONS.cleanEntry]: () => {
      newState.entry = '';
    },
    [CALCULATOR_BUTTONS.backSpace]: () => {
      if (entry.length) {
        newState.entry = entry.slice(0, entry.length - 1) || '';
      } else {
        newState.expression = expression.slice(0, expression.length - 1) || '';
      }
    },
    [CALCULATOR_BUTTONS.changeSign]: () => {
      if (entry) {
        newState.entry = String(Number(toFullWideNumberString(entry)) * -1);
      }
    },
    [CALCULATOR_BUTTONS.leftBracket]: (keypadValue) => {
      if (
        (operators.includes(expression.at(-1)) &&
          expression.at(-1) !== CALCULATOR_BUTTONS.leftBracket &&
          expression.at(-1) !== CALCULATOR_BUTTONS.rightBracket &&
          entry === '') ||
        expression === ''
      ) {
        newState.expression = expression + keypadValue;
      }
    },
    [CALCULATOR_BUTTONS.rightBracket]: (keypadValue) => {
      if (expression.at(-1) === CALCULATOR_BUTTONS.rightBracket) {
        newState.expression = expression + keypadValue;
      } else {
        newState.expression = expression + Number(entry) + keypadValue;
      }

      newState.entry = '';
    },
    [CALCULATOR_BUTTONS.dot]: () => {
      if (!entry.includes(CALCULATOR_BUTTONS.dot)) {
        newState.entry = entry + CALCULATOR_BUTTONS.dot;
      }
    },
    operator: (keypadValue) => {
      const isLastExpressionCharOperator = (expression, entry) => {
        return Boolean(
          operators.includes(expression.at(-1)) &&
            expression.at(-1) !== CALCULATOR_BUTTONS.leftBracket &&
            expression.at(-1) !== CALCULATOR_BUTTONS.rightBracket &&
            entry === '',
        );
      };

      const isLeftBracketPrecedingOperator = (expression, entry) => {
        return Boolean(
          expression.at(-1) === CALCULATOR_BUTTONS.leftBracket && entry === '',
        );
      };

      if (isLastExpressionCharOperator(expression, entry)) {
        newState.expression = expression.slice(0, -1) + keypadValue;
      } else if (isLeftBracketPrecedingOperator(expression, entry)) {
        if (
          keypadValue === CALCULATOR_BUTTONS.plus ||
          keypadValue === CALCULATOR_BUTTONS.minus
        ) {
          newState.expression = expression + entry + keypadValue;
        }
      } else if (entry) {
        newState.expression =
          expression + toFullWideNumberString(entry) + keypadValue;
      } else {
        newState.expression = expression + entry + keypadValue;
      }

      newState.entry = '';
    },
  };

  const isIncorrectEntry = (entry) => {
    return (
      Number(entry) === Infinity ||
      Number(entry) === -Infinity ||
      (Number.isNaN(entry) && entry !== CALCULATOR_BUTTONS.dot)
    );
  };

  const isNonMathOperation = (keypadValue) =>
    Boolean(calculatorOperations[keypadValue]);

  const isMathOperator = (keypadValue) => operators.includes(keypadValue);

  if (isIncorrectEntry(entry)) {
    entry = '';
    newState.entry = '';
  }

  if (isNonMathOperation(keypadValue)) {
    const calulatorOperation = calculatorOperations[keypadValue];
    calulatorOperation(keypadValue);
  } else if (isMathOperator(keypadValue)) {
    const operatorOperation = calculatorOperations.operator;
    operatorOperation(keypadValue);
  } else if (entry.length < maxEntryLength) {
    newState.entry = (entry === '0' ? '' : entry) + keypadValue;
  }

  return newState;
};
