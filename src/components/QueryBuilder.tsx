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
import {Button, Input, message} from 'antd';
import 'react-querybuilder/dist/query-builder.css';
import {QueryBuilderAntD,AntDValueSelector, AntDValueEditor} from '@react-querybuilder/antd';
import {useAppContext} from '../AppContent';
import React from "react";
import {Field} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";
import {CustomValueSelector} from "./CustomValueSelector";

export const operatorSelector = (props: OperatorSelectorProps) => {
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
    return <AntDValueSelector
        {...props}
        options={options}
        value={props.value}
        handleOnChange={props.handleOnChange}
    />;
};

export const CombinatorSelector = (props: CombinatorSelectorProps) => {
    const options: OptionList = [
        { name: 'And', label: 'and' },
        { name: 'Or', label: 'or' },
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
            <div style={{ marginLeft: '8px', marginRight: '8px', width: '180px' }}>
                <Input placeholder="Operation Result Name"  onChange={handleInputChange} />
            </div>
            <Button onClick={() => addToFeature(fields, setFields, inputValue)} style={{ backgroundColor: '#FDEBD0' }}>+Feature</Button>
        </div>
    );
}



const addToFeature = (fields: Field[], setFields: React.Dispatch<React.SetStateAction<Field[]>>,label:string) => {
    if (!label.trim()) {
        window.alert('Feature name cannot be empty');
        return;
    }

    const name = window.prompt("Enter feature description:");

    if (!name || !name.trim()) {
        window.alert('Feature description cannot be empty');
        return;
    }

    if (fields.some(field => field.label === label)) {
        const replace = window.confirm(`A field with name "${label}" already exists. Do you want to replace it?`);
        if (!replace) {
            return;
        }
    }

    const newField: Field = { name: name, label: label };

    const updatedFields = fields.filter(field => field.name !== name).concat(newField);

    setFields(updatedFields);
};



const CustomFieldSelector = (props: FieldSelectorProps) => {
    return (
        <div style={{ width: '150px' }}>
            <CustomValueSelector {...props} style={{ width: '100%' }} />
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
        setOperationResultName,
        logic,
        modules,
        setModules,
        }=useAppContext();

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
            const id = logic.id;
            let newModules = [...modules];
            let moduleIndex = null;
            let logicIndex = null;

            newModules.forEach((module, mIndex) => {
                module.logics.forEach((item, lIndex) => {
                    if (item.id === id) {
                        moduleIndex = mIndex;
                        logicIndex = lIndex;
                        newModules[moduleIndex].logics[logicIndex].logicQuery = query;
                        newModules[moduleIndex].logics[logicIndex].logicName = ruleResult;
                    }
                });
            });

            if (moduleIndex !== null && logicIndex !== null) {
                setModules(newModules);
                message.success('Logic Saved');
            } else {
                console.error('Logic not found');
            }
            setSaveRuleModalVisible(false);
        }

        return (
            <Button onClick={handleSaveRule} style={{backgroundColor: '#EBF5FB'}}>Save Logic</Button>
        );
    }

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
                        <h3>LogicBuilder</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0px', marginBottom: '10px' }}>
                        <div style={{ whiteSpace: 'nowrap', marginRight: '10px' }}>Logic Result Name:</div>
                        <Input
                            placeholder="Logic Result Name"
                            value={ruleResult}
                            onChange={(e) => setRuleResult(e.target.value)}
                            style={{ marginBottom: '10px', marginRight: '10px', marginTop: '10px', width: '150px' }}
                        />
                        <Button onClick={() => addToFeature(fields, setFields, ruleResult)} style={{backgroundColor: '#FDEBD0', marginRight: '10px'}}>+Feature</Button>
                        <SaveRuleButton />
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
