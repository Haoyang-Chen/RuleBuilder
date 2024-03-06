import {QueryBuilderDnD} from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import {
    ActionWithRulesAndAddersProps,
    CombinatorSelectorProps,
    OptionList,
    ValueEditorProps,
    ValueEditor,
    ActionProps,
    ActionElement,
    OperatorSelectorProps,
    FieldSelectorProps,
    findPath
} from 'react-querybuilder';
import {QueryBuilder} from 'react-querybuilder';
import {Button, Input} from 'antd';
import 'react-querybuilder/dist/query-builder.css';
import {QueryBuilderAntD,AntDValueSelector, AntDActionElement,AntDValueEditor} from '@react-querybuilder/antd';
import {useAppContext} from '../AppContent';
import {ExportButton, ImportButton} from "./ExportImportButtons";
import React, {useState} from "react";
import {Field} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";

const operatorSelector = (props: OperatorSelectorProps) => {
    const options: OptionList = [
        { name: '=', label: '=' },
        // { name: '!=', label: '!=' },
        { name: '>', label: '>' },
        // { name: '>=', label: '>=' },
        { name: '<', label: '<' },
        // { name: '<=', label: '<=' },
        { name: 'between', label: 'between' },
    ];
    return <AntDValueSelector
        {...props}
        options={options}
        value={props.value}
        handleOnChange={props.handleOnChange}
    />;
};

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


const CustomValueEditor = (props: ValueEditorProps) => {
    const {
        query,
        operationResultName,
        setOperationResultName,
        fields,
        setFields}=useAppContext();

    const { path } = props;

    const rule = findPath(path,query);
    const [inputValue, setInputValue] = React.useState(() => {
        const existingName = operationResultName.find(item => item.rule === rule);
        return existingName ? existingName.name : '';
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        const ruleIndex = operationResultName.findIndex(item => item.rule === rule);
        // console.log(rule)
        console.log(path)
        if (ruleIndex !== -1) {
            const updatedOperationResultName = [...operationResultName];
            updatedOperationResultName[ruleIndex] = { ...updatedOperationResultName[ruleIndex], name: inputValue };
            setOperationResultName(updatedOperationResultName);
        } else {
            if (rule) {
                setOperationResultName([...operationResultName, { name: inputValue, rule: rule }]);
            }
        }
    };

    return (
        <div style={{display:'flex'}}>
            <div style={{ width: '250px' }}>
            <AntDValueEditor {...props} />
            </div>
            <div style={{ marginLeft: '8px',marginRight: '8px',width: '200px' }}>
                <Input placeholder="Operation Result Name" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} />
            </div>
            <Button onClick={() => addToFeature(fields,setFields,inputValue)} style={{backgroundColor: '#FDEBD0'}}>+Feature</Button>
        </div>
    );
}

const addToFeature = (fields: Field[], setFields: React.Dispatch<React.SetStateAction<Field[]>>, name: string) => {
    if (!name.trim()) {
        return;
    }

    if (fields.some(field => field.name === name)) {
        const replace = window.confirm(`A field with name "${name}" already exists.`);
        if (!replace) {
            return;
        }
    }

    const newField: Field = { name: name, label: name };

    const updatedFields = fields.filter(field => field.name !== name).concat(newField);

    setFields(updatedFields);
}


const CustomFieldSelector = (props: FieldSelectorProps) => {

    return (
        <div style={{ width: '250px' }}>
            <AntDValueSelector {...props} style={{ width: '100%' }}/>
        </div>
    );
};

const CustomQueryBuilder = () => {
    const {
        query,
        setQuery,
        ruleResult,
        setRuleResult,
        setSaveGroupModalVisible,
        setSaveRuleModalVisible,
        fields,
        setFields}=useAppContext();

    const AddRuleButtons = (props: ActionWithRulesAndAddersProps) => {
        const handleSaveGroup = () => {
            setSaveGroupModalVisible(true);
        };

        return(
            <>
                <Button onClick={handleSaveGroup} style={{backgroundColor: '#D5F5E3'}}>Save Group</Button>
                <Button onClick={(e) => props.handleOnClick(e)}>+Rule</Button>
            </>
        );
    };

    const SaveRuleButton = () => {
        function handleSaveRule() {
            setSaveRuleModalVisible(true);
        }

        return (
            <Button onClick={handleSaveRule} style={{backgroundColor: '#EBF5FB'}}>Save Rule</Button>
        );
    }

    const ClearRuleButton = () => {
        function handleClearRule() {
            const confirmClear = window.confirm('Are you sure you want to clear the rule?');
            if (confirmClear) {
                setQuery({ combinator: 'AND', rules: [] });
                setRuleResult('');
            }
        }

        return (
            <Button onClick={handleClearRule} style={{ backgroundColor: 'red' }}>

                <span style={{color:'white'}}>Clear Rule</span>
            </Button>
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
                        <ClearRuleButton />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0px', marginBottom: '10px' }}>
                        <div style={{ whiteSpace: 'nowrap', marginRight: '10px' }}>Rule Result Name:</div>
                        <Input
                            placeholder="Rule Result Name"
                            value={ruleResult}
                            onChange={(e) => setRuleResult(e.target.value)}
                            style={{ marginBottom: '10px', marginRight: '10px', marginTop: '10px', width: '378px' }}
                        />
                        <Button onClick={() => addToFeature(fields, setFields, ruleResult)} style={{backgroundColor: '#FDEBD0'}}>+Feature</Button>
                    </div>

                    <div style={{ marginBottom: '10px' ,marginTop: '10px', width:'1000px'}}>
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
                                        fieldSelector: CustomFieldSelector,
                                        operatorSelector: operatorSelector,
                                        valueEditor: CustomValueEditor
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
