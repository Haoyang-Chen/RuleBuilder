import {QueryBuilderDnD} from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import {
    ActionWithRulesAndAddersProps,
    CombinatorSelectorProps,
    OptionList,
    ValueEditorProps,
    OperatorSelectorProps,
    FieldSelectorProps,
    findPath
} from 'react-querybuilder';
import {QueryBuilder} from 'react-querybuilder';
import {Button, Input} from 'antd';
import 'react-querybuilder/dist/query-builder.css';
import {QueryBuilderAntD,AntDValueSelector, AntDValueEditor} from '@react-querybuilder/antd';
import {useAppContext} from '../AppContent';
import {ExportButton, ImportButton} from "./ExportImportButtons";
import React from "react";
import {Field} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";

export const operatorSelector = (props: OperatorSelectorProps) => {
    const options: OptionList = [
        { name: '=', label: '=' },
        // { name: '!=', label: '!=' },
        { name: '>', label: '>' },
        // { name: '>=', label: '>=' },
        { name: '<', label: '<' },
        // { name: '<=', label: '<=' },
        { name: 'between', label: 'between' },
        { name:'is True',label:'is True'},
    ];
    return <AntDValueSelector
        {...props}
        options={options}
        value={props.value}
        handleOnChange={props.handleOnChange}
    />;
};

export const CombinatorSelector = (props: CombinatorSelectorProps) => {
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


export const CustomValueEditor = (props: ValueEditorProps) => {
    const {
        query,
        operationResultName,
        setOperationResultName,
        fields,
        setFields
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
                    id: rule.id || '' // 将 undefined 转换为空字符串
                });
            }
            setOperationResultName(updatedOperationResultName);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (operator === 'is True' &&rule) {
            const ruleIndex = operationResultName.findIndex(item => item.id === rule.id);
            if (ruleIndex !== -1) {
                const updatedOperationResultName = [...operationResultName];
                updatedOperationResultName.splice(ruleIndex, 1);
                setOperationResultName(updatedOperationResultName);
            }
        } else {
            updateOperationResultName(e.target.value); // 更新 operationResultName
        }
    };

    if (operator === 'is True') {
        return null;
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>
                <AntDValueEditor {...props} />
            </div>
            <div style={{ marginLeft: '8px', marginRight: '8px', width: '180px' }}>
                <Input placeholder="Operation Result Name"  onChange={handleInputChange} />
            </div>
            <Button onClick={() => addToFeature(fields, setFields, inputValue)} style={{ backgroundColor: '#FDEBD0' }}>+Feature</Button>
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
        <div style={{ width: '150px' }}>
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
        setFields,
        operationResultName,
        setOperationResultName}=useAppContext();

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

    const QueryChangeHandler = (q: any) => {
        //find the changed rule
        query.rules.forEach((rule: any) => {
            const changedRule = q.rules.find((r: any) => r.id === rule.id && r !== rule);
            if (changedRule) {
                console.log('changed rule:', changedRule);
                //search and update operation result name
                const existingIndex = operationResultName.findIndex((item) => item.id === rule.id);
                if (existingIndex !== -1) {
                    let updatedOperationResultName = [...operationResultName];
                    if (changedRule.operator === 'is True') {
                        //remove this
                        updatedOperationResultName = operationResultName.filter(item => item.id !== rule.id);
                    }
                    else {
                        updatedOperationResultName[existingIndex] = {
                            ...updatedOperationResultName[existingIndex],
                            rule: changedRule
                        };
                    }
                    setOperationResultName(updatedOperationResultName);
                }
            }
        });

        setQuery(q);


    }


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
                            style={{ marginBottom: '10px', marginRight: '10px', marginTop: '10px', width: '150px' }}
                        />
                        <Button onClick={() => addToFeature(fields, setFields, ruleResult)} style={{backgroundColor: '#FDEBD0'}}>+Feature</Button>
                    </div>

                    <div style={{ marginBottom: '10px' ,marginTop: '10px', width:'750px'}}>
                        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
                            <QueryBuilderAntD>
                                <QueryBuilder
                                    fields={fields}
                                    query={query}
                                    onQueryChange={(q: any) => QueryChangeHandler(q)}
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
