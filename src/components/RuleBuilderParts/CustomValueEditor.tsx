import {findPath, ValueEditorProps} from "react-querybuilder";
import {useAppContext} from "../../AppContent";
import React from "react";
import {AntDValueEditor} from "@react-querybuilder/antd";

export const CustomValueEditor = (props: ValueEditorProps) => {
    const {
        query,
        operationResultName,
        setOperationResultName,
    } = useAppContext();

    const { path, operator } = props;

    const rule = findPath(path, query);
    const [inputValue, setInputValue] = React.useState(() => {
        const existingName = operationResultName.find(item => item.rule === rule);
        return existingName ? existingName.name : '';
    });

    const updateOperationResultName = (value: string) => {
        if (rule) {
            const existingIndex = operationResultName.findIndex(item => item.id === rule.id);
            const updatedOperationResultName = [...operationResultName];
            if (existingIndex !== -1) {
                updatedOperationResultName[existingIndex] = {
                    ...updatedOperationResultName[existingIndex],
                    name: value
                };
            } else {
                updatedOperationResultName.push({
                    name: value,
                    rule,
                    id: rule.id || ''
                });
            }
            setOperationResultName(updatedOperationResultName);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('rule', rule);
        console.log('path', path);
        setInputValue(e.target.value);
        if (operator === 'is Observed' &&rule) {
            const ruleIndex = operationResultName.findIndex(item => item.id === rule.id);
            if (ruleIndex !== -1) {
                const updatedOperationResultName = [...operationResultName];
                updatedOperationResultName.splice(ruleIndex, 1);
                setOperationResultName(updatedOperationResultName);
            }
        } else {
            updateOperationResultName(e.target.value);
        }
    };

    if (operator === 'is Observed') {
        return null;
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>
                <AntDValueEditor {...props} />
            </div>
            {/*<div style={{ marginLeft: '8px', marginRight: '8px', width: '180px' }}>*/}
            {/*    <Input placeholder="Operation Result Name"  onChange={handleInputChange} />*/}
            {/*</div>*/}
            {/*<Button onClick={() => addToFeature(fields, setFields, inputValue)} style={{ backgroundColor: '#FDEBD0' }}>+Feature</Button>*/}
        </div>
    );
}

export default CustomValueEditor;