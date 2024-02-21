import React from 'react';
import {useAppContext} from "../AppContent";
import {formatQuery} from "react-querybuilder";


const Debugger= () => {
    const {query, result}=useAppContext();

    return (
        <>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px' ,width:'1000px'}}>
                    <h3>Debug Info</h3>
                    <span title='result name' style={{color:'red'}}>{result} = </span><code>{formatQuery(query, 'spel')}</code>:
                </div>
            </div>
        </>

    );
};

export default Debugger;
