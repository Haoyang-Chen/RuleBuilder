import {QueryBuilderDnD} from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import {
    ActionWithRulesAndAddersProps,
    CombinatorSelectorProps,
    FieldSelectorProps,
    findPath,
    OperatorSelectorProps,
    OptionList,
    QueryBuilder, RuleGroupArray, RuleGroupType, RuleType,
    ValueEditorProps
} from 'react-querybuilder';
import {Button, Input, message} from 'antd';
import 'react-querybuilder/dist/query-builder.css';
import {AntDValueEditor, AntDValueSelector, QueryBuilderAntD} from '@react-querybuilder/antd';
import {useAppContext} from '../AppContent';
import React from "react";
import {Field} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";
import {CustomValueSelector} from "./CustomValueSelector";
import "../App.css";

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
            {/*<div style={{ marginLeft: '8px', marginRight: '8px', width: '180px' }}>*/}
            {/*    <Input placeholder="Operation Result Name"  onChange={handleInputChange} />*/}
            {/*</div>*/}
            {/*<Button onClick={() => addToFeature(fields, setFields, inputValue)} style={{ backgroundColor: '#FDEBD0' }}>+Feature</Button>*/}
        </div>
    );
}



const addToFeature = (fields: Field[], setFields: React.Dispatch<React.SetStateAction<Field[]>>,label:string) => {
    if (!label.trim()) {
        window.alert('Name cannot be empty');
        return -1;
    }

    const name = window.prompt("Enter description:");

    if (!name || !name.trim()) {
        window.alert('Description cannot be empty');
        return -1;
    }

    if (fields.some(field => field.label === label)) {
        const replace = window.confirm(`A field with name "${label}" already exists. Do you want to replace it?`);
        if (!replace) {
            return -1;
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
        setDisplayQuery,
        setSaveGroupModalVisible,
        setSaveRuleModalVisible,
        fields,
        setFields,
        operationResultName,
        setOperationResultName,
        logic,
        modules,
        setModules,
        isQueryBuilderVisible,
        setIsQueryBuilderVisible,
        }=useAppContext();

    const AddRuleButtons = (props: ActionWithRulesAndAddersProps) => {
        // const handleSaveGroup = () => {
        //     setSaveGroupModalVisible(true);
        // };
        // const group= props.rules;
        const handleCopy=()=>{
            // setDisplayQuery();
            // console.log('group:',group);
            console.log('query:',query);
            const rule = props.rules as RuleGroupArray
            console.log('rule:',rule);
            if(rule){
                const newGroup: RuleGroupType = {
                    combinator: 'and',
                    rules: rule,
                };
                setDisplayQuery(newGroup);
            }
        };

        return(
            <>
                {/*<Button onClick={handleSaveGroup} style={{backgroundColor: '#D5F5E3'}}>Save Group</Button>*/}
                <Button onClick={handleCopy} style={{backgroundColor: '#D5F5E3'}}>Copy Group</Button>
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
                        newModules[moduleIndex].logics[logicIndex].operations = logic.operations;
                    }
                });
            });

            if (moduleIndex !== null && logicIndex !== null) {
                // if(addToFeature(fields, setFields, ruleResult)===-1){
                //     return;
                // }
                // let field= fields.find((field) => field.id === logic.id);
                // field.label=ruleResult;
                // setFields([...fields]);
                const newFields = fields.filter((field) => field.id !== logic.id);
                newFields.push({id: logic.id, label: ruleResult, name: fields.find((field) => field.id === logic.id)?.name || ''});
                setFields(newFields);

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

    // const FindChangedRule = (rule:any) => {
    //     if (rule.combinator){
    //         rule.rules.forEach((r:any) => {
    //             FindChangedRule(r);
    //         });
    //     }else {
    //         //search and update operation result name
    //         query.rules
    //     }
    // }

    const GetRules = (query:any) => {
        let rules:any[]=[];
        query.rules.forEach((rule:any) => {
            if (rule.rules){
                rules=rules.concat(GetRules(rule));
            }else{
                rules.push(rule);
            }
        });
        return rules;
    }

    const QueryChangeHandler = (q: any) => {
        //find the changed rule
        const OriginalRules = GetRules(query);
        const ChangedRules = GetRules(q);
        OriginalRules.forEach((rule: any) => {
            const changedRule = ChangedRules.find((r: any) => r.id === rule.id && r !== rule);
            if (changedRule) {
                console.log('changed rule:', changedRule);
                console.log('query', query);
                //search and update operation result name
                // const existingIndex = operationResultName.findIndex((item) => item.id === rule.id);
                // if (existingIndex !== -1) {
                //     let updatedOperationResultName = [...operationResultName];
                //     if (changedRule.operator === 'is True') {
                //         //remove this
                //         updatedOperationResultName = operationResultName.filter(item => item.id !== rule.id);
                //     }
                //     else {
                //         updatedOperationResultName[existingIndex] = {
                //             ...updatedOperationResultName[existingIndex],
                //             rule: changedRule
                //         };
                //     }
                //     setOperationResultName(updatedOperationResultName);
                // }
                const newLogic = {...logic};
                let operationIndex = -1;
                newLogic.operations.forEach((operation) => {
                    if (operation.id === rule.id) {
                        operationIndex = newLogic.operations.indexOf(operation);
                        //operation name = logic name + index of operation in logic.operations
                        newLogic.operations[logic.operations.indexOf(operation)] = {
                            id: changedRule.id,
                            left: changedRule.field,
                            mid: changedRule.operator,
                            right: changedRule.value,
                            name: logic.logicName + '_' + operationIndex
                        };
                    }
                });
                if (operationIndex === -1) {
                    const newOperation = {
                        id: changedRule.id,
                        left: changedRule.field,
                        mid: changedRule.operator,
                        right: changedRule.value,
                        name: logic.logicName + '_' + newLogic.operations.length
                    };
                    newLogic.operations.push(newOperation);
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

                    { isQueryBuilderVisible &&
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0px', marginBottom: '10px' }}>
                                <div style={{ whiteSpace: 'nowrap', marginRight: '10px' }}>Logic Target Name:</div>
                                <Input
                                    placeholder="Logic Target Name"
                                    value={ruleResult}
                                    onChange={(e) => setRuleResult(e.target.value)}
                                    style={{ marginBottom: '10px', marginRight: '10px', marginTop: '10px', width: '150px' }}
                                />
                                {/*<Button onClick={() => addToFeature(fields, setFields, ruleResult)} style={{backgroundColor: '#FDEBD0', marginRight: '10px'}}>+Feature</Button>*/}
                                <SaveRuleButton />
                            </div>

                            <div style={{ marginBottom: '10px' ,marginTop: '10px', width:'600px'}}>
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
                        </>
                }
                    { !isQueryBuilderVisible &&
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0px', marginBottom: '10px', width:'600px'}}>
                                <h3 style={{ color: 'gray' }}>To Start, Add a Module and Logic</h3>
                            </div>
                        </>
                    }

                </div>
            </div>
    );
};

export default CustomQueryBuilder;
