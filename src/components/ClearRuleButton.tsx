import React from 'react';
import { useAppContext } from '../AppContent';
import {Button} from 'antd';


export const ClearRuleButton = () => {
    const { setQuery, setRuleResult } = useAppContext();
    function handleClearRule() {
        const confirmClear = window.confirm('Are you sure you want to clear the rule?');
        if (confirmClear) {
            setQuery({ combinator: 'AND', rules: [] });
            setRuleResult('');
        }
    }

    return (
        <Button onClick={handleClearRule} style={{ backgroundColor: 'red' }}>

            <span style={{color:'white'}}>Clear</span>
        </Button>
    );
};

export default ClearRuleButton;