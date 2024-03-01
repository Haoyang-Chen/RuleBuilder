import {QueryBuilderDnD} from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import {
    ActionWithRulesAndAddersProps,
    CombinatorSelectorProps,
    OptionList, ValueEditorProps, ValueEditor, ActionProps, ActionElement
} from 'react-querybuilder';
import {QueryBuilder} from 'react-querybuilder';
import {Button, Input} from 'antd';
import 'react-querybuilder/dist/query-builder.css';
import {QueryBuilderAntD,AntDValueSelector,AntDValueEditor, AntDActionElement} from '@react-querybuilder/antd';
import {useAppContext} from '../AppContent';
import {ExportButton, ImportButton} from "./ExportImportButtons";
import {fields} from "./Fields";
import React, {useState} from "react";

type AntDValueEditorProps = ValueEditorProps & { extraProps?: Record<string, any> };

const CustomQueryBuilder = () => {
    const {
        query,
        setQuery,
        result,
        setResult,
        setSaveGroupModalVisible,
        setSaveRuleModalVisible,
        operationResultName,
        setOperationResultName}=useAppContext();



    const AddRuleButtons = (props: ActionWithRulesAndAddersProps) => {
        const handleSaveGroup = () => {
            setSaveGroupModalVisible(true);
        };

        return(
            <>
                <Button onClick={handleSaveGroup}>Save Group</Button>
                <Button onClick={(e) => props.handleOnClick(e)}>+Rule</Button>
            </>
        );
    };

    const SaveRuleButton = () => {
        function handleSaveRule() {
            setSaveRuleModalVisible(true);
        }

        return (
            <Button onClick={handleSaveRule}>Save Rule</Button>
        );
    }

    const CombinatorSelector = (props: CombinatorSelectorProps) => {
        const options: OptionList = [
            { name: 'And', label: 'AND' },
            { name: 'Or', label: 'OR' },
            { name:'Gor2', label:'GOR2'}
        ];

        return (
            <AntDValueSelector
                {...props}
                options={options}
                value={props.value}
                handleOnChange={props.handleOnChange}
            />
        );
    };

    const CustomValueEditor = (props: AntDValueEditorProps) => {
        const { rule,handleOnChange} = props;
        //
        // const [value, setValue] = useState('');
        //
        //
        // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //     setValue(e.target.value);
        //     const inputValue = e.target.value;
        //     const ruleIndex = operationResultName.findIndex(item => item.id === rule.id);
        //     if (ruleIndex !== -1) {
        //         const updatedOperationResultName = [...operationResultName];
        //         updatedOperationResultName[ruleIndex] = { ...updatedOperationResultName[ruleIndex], name: inputValue };
        //         setOperationResultName(updatedOperationResultName);
        //     } else {
        //         if (rule.id) {
        //             setOperationResultName([...operationResultName, { name: inputValue, id: rule.id }]);
        //         }
        //     }
        //
        // };

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AntDValueEditor {...props} />
                {/*<div style={{ marginLeft: '30px' }}>*/}
                {/*    <Input placeholder="Operation Result Name" value={value} onChange={handleInputChange} />*/}
                {/*</div>*/}
            </div>
        );
    };

    const RemoveRuleAction = (props: ActionProps) => {
        const { path } = props;
        const rule = query.rules[path[0]];
        const [inputValue, setInputValue] = React.useState(() => {
            const existingName = operationResultName.find(item => item.id === rule.id);
            return existingName ? existingName.name : '';
        });

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
        };

        const handleInputBlur = () => {
            const ruleIndex = operationResultName.findIndex(item => item.id === rule.id);
            if (ruleIndex !== -1) {
                const updatedOperationResultName = [...operationResultName];
                updatedOperationResultName[ruleIndex] = { ...updatedOperationResultName[ruleIndex], name: inputValue };
                setOperationResultName(updatedOperationResultName);
            } else {
                if (rule.id) {
                    setOperationResultName([...operationResultName, { name: inputValue, id: rule.id }]);
                }
            }
        };

        return (
            <div style={{display:'flex'}}>
                <div style={{ marginLeft: '30px' }}>
                    <Input placeholder="Operation Result Name" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} />
                </div>
                <AntDActionElement{...props} />
            </div>
        );
    };






    return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'0px'}}>
                        <h3>RuleBuilder</h3>
                        <SaveRuleButton />
                        <ExportButton />
                        <ImportButton />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'0px', marginBottom: '10px'}}>
                        <div style={{ whiteSpace: 'nowrap' }}>Result Name:</div>
                        <Input
                            placeholder="Result Name"
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            style={{ marginBottom: '10px' ,marginTop: '10px', width:'378px'}}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' ,marginTop: '10px', width:'900px'}}>
                        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
                            <QueryBuilderAntD>
                                <QueryBuilder
                                    fields={fields}
                                    query={query}
                                    onQueryChange={(q: any) => setQuery(q)}
                                    showNotToggle
                                    addRuleToNewGroups
                                    controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                                    controlElements={{
                                        addRuleAction: AddRuleButtons,
                                        combinatorSelector: CombinatorSelector,
                                        removeRuleAction: RemoveRuleAction,
                                    }}
                                />
                            </QueryBuilderAntD>
                        </QueryBuilderDnD>
                    </div>
                </div>
            </div>
    );
};

export default CustomQueryBuilder;
