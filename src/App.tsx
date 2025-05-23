import { useState } from 'react'
import Display from './components/Display';
import Button from './components/Button';
import './App.css';

type Operator = '+' | '-' | '*' | '/'; // '=';
function App() {
  const [displayValue, setDisplayValue] = useState<string>('0'); // 画面に表示されている値
  const [currentValue, setCurrentValue] = useState<number | null>(null); // 現在の計算結果
  const [operator, setOperator] = useState<Operator | null>(null); // 演算子
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false); // 演算子ボタンを押した後かどうか
  const [expression, setExpression] = useState<string>(''); // 計算式全体を表示する

  // 数字ボタンが押されたときの処理
  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
      setExpression(expression + digit);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
      setExpression(expression === '0' ? digit : expression + digit);
    }
  };

  // 小数点ボタンが押されたときの処理
  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      setExpression(expression + '0.');
    } else {
      if (!displayValue.includes('.')) {
        setDisplayValue(displayValue + '.');
        setExpression(expression + '.');
      }
    }
  };

  // 演算子ボタンが押されたときの処理
  const handleOperator = (inputOperator: Operator) => {
    const inputValue = parseFloat(displayValue);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setCurrentValue(result);
      setDisplayValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(inputOperator);
    setExpression(expression + inputOperator);
  };

  // イコールボタンを押されたときの処理
  const handleEquals = () => {
    if (operator === null || currentValue === null) {
      return;
    }
    const inputValue = parseFloat(displayValue);
    const result = calculate(currentValue, inputValue, operator);
    setCurrentValue(result);
    setDisplayValue(String(result));

    setWaitingForOperand(true);
    setOperator(null);
    setExpression('');
  };

  // クリアボタンが押されたときの処理
  const handleClear = () => {
    setDisplayValue('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression('');
  };

  // 計算ロジック
  const calculate = (a: number, b: number, operator: Operator): number => {
    let result: number;

    switch (operator) {
      case '+':
        result =  a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        if (b === 0) {
          alert("0で割ることはできません");
          return NaN;
        }
        result = a / b;
        break;
      default:
        return b;
    }

    const roundedResult = parseFloat(result.toFixed(3));
    return roundedResult;
  };

  
  /* TODO: 以下の処理を実装する
   * - 表示形式を変更する。具体的には、イコールボタンを押すまでに入力したボタンの内容をすべて表示する
   *   (例：押したボタンが5 → + → 2 → - → 3と入力したとき、5+2-3と表示されるようにする)
   *   →(追加)現在イコールボタンを押すと表示がリセットされるようになっている。イコールボタンを押したあとにまた演算子ボタンを押すと意図していない表示になってしまうので、修正する
  */
  return (
    <>
      <h1>電卓アプリ</h1>
      <div className='calculator'>
        <Display value={displayValue} expression={expression} />
        <div className='button-grid'>
          {/* 数字ボタン */}
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((digit) => (
            <Button key={digit} label={digit} onClick={() => handleDigit(digit)} className='number' />
          ))};
          {/* 演算子ボタン */}
          <Button label='+' onClick={() => handleOperator('+')} className='operator' />
          <Button label='-' onClick={() => handleOperator('-')} className='operator' />
          <Button label='*' onClick={() => handleOperator('*')} className='operator' />
          <Button label='/' onClick={() => handleOperator('/')} className='operator' />
          {/* 特殊ボタン */}
          <Button label='.' onClick={() => handleDecimal()} className='decimal' />
          <Button label='=' onClick={() => handleEquals()} className='equals' />
          <Button label='C' onClick={() => handleClear()} className='clear' />
        </div>
      </div>
    </>
  )
}

export default App
