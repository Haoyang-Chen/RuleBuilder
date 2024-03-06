import React from 'react';
import {useAppContext} from "../AppContent";
import {formatQuery} from "react-querybuilder";

const Debugger= () => {
    const {query, ruleResult,operationResultName}=useAppContext();
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px',marginTop:'30px' }}>
                <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', width: '1000px' }}>
                    <h3>Debug Info</h3>
                    <span title='result name' style={{ color: 'red' }}>{ruleResult} = </span><code>{formatQuery(query, 'spel')}</code>:
                    <h3>Operation Result Name</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {operationResultName.map((item, index) => (
                            <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '10px', fontSize: '16px', fontWeight: 'bold' }}>{item.name}:</div>
                                <div style={{ fontSize: '16px' }}>
                                    {item.rule.field} <span style={{ margin: '0 4px' }}>{item.rule.operator}</span> {item.rule.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>


    );
};

export default Debugger;
