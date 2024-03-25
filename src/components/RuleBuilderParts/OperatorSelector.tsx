import {OperatorSelectorProps, OptionList} from "react-querybuilder";
import {AntDValueSelector} from "@react-querybuilder/antd";
import React from "react";

export const OperatorSelector = (props: OperatorSelectorProps) => {
    const options: OptionList = [
        { name: '=', label: '=' },
        // { name: '!=', label: '!=' },
        { name: '>', label: '>' },
        // { name: '>=', label: '>=' },
        { name: '<', label: '<' },
        // { name: '<=', label: '<=' },
        { name: 'between', label: 'between' },
        { name:'is Observed',label:'is Observed'},
    ];

    if (props.value==='Result'){
        return <span style={{fontSize:'20px',color:'white',fontWeight:"bold"}}>Result Name: </span>;
    }

    return <AntDValueSelector
        {...props}
        options={options}
        value={props.value}
        handleOnChange={props.handleOnChange}
    />;
};
export default OperatorSelector;