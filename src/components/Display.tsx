import React from 'react'
import './Display.css';

interface DisplayProps {
    value: string;
    expression: string;
}

const Display: React.FC<DisplayProps> = ({ value, expression }) => {
    return (
        <div className="calculator-display-container">
            {/* 計算式を表示する部分 */}
            <div className='calculator-expression'>
                {expression}
            </div>
            {/* 計算結果を表示する部分 */}
            <div className='calculator-current-value'>
                {value}
            </div>
        </div>
    );
};

export default Display;