import {QueryBuilderDnD} from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import {
    findPath,
    QueryBuilder, RuleGroupType, RuleType,
} from 'react-querybuilder';
import {Input, message} from 'antd';
import 'react-querybuilder/dist/query-builder.css';
import {
    QueryBuilderAntD
} from '@react-querybuilder/antd';
import {useAppContext} from '../AppContent';
import React from "react";
import {Field} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";
import "../App.css";
import AddGroupButton from "./RuleBuilderParts/AddGroupButton";
import AddRuleButtons from "./RuleBuilderParts/AddRuleButtons";
import NotToggle from "./RuleBuilderParts/NotToggle";
import SaveRuleButton from "./RuleBuilderParts/SaveRuleButton";
import CustomFieldSelector from "./RuleBuilderParts/CustomFieldSelector";
import OperatorSelector from "./RuleBuilderParts/OperatorSelector";
import CombinatorSelector from "./RuleBuilderParts/CombinatorSelector";
import CustomValueEditor from "./RuleBuilderParts/CustomValueEditor";
import RemoveGroupButton from "./RuleBuilderParts/RemoveGroupButton";
import RemoveRuleButton from "./RuleBuilderParts/RemoveRuleButton";

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



const CustomQueryBuilder = () => {
    const {
        query,
        setQuery,
        ruleResult,
        setRuleResult,
        fields,
        originField,
        setFields,
        logic,
        isQueryBuilderVisible,
        modules,
        setModules,
        }=useAppContext();


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
            setModules(newModules);
        }
    }

    const QueryChangeHandler = (q: any) => {
        //find the changed rule
        const OriginalRules = GetRules(query);
        const ChangedRules = GetRules(q);

        ChangedRules.forEach((rule: any) => {
            if (rule.operator==='Result'){
                let found=false;
                let newField = fields.filter(field => !originField.includes(field));
                newField.forEach((field) => {
                    if (field.id===rule.id){
                        field.name=rule.value;
                        field.label=rule.value;
                        found=true;
                    }
                });
                if (!found){
                    newField.push({name:rule.value,label:rule.value,id:rule.id});
                }
                setFields([...originField,...newField]);
            }
            // handleSaveRule();
        });

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

    const CustomGetRuleGroupClassname = (ruleGroup: RuleGroupType) => {
        if (ruleGroup.combinator === 'if') {
            return 'IfGroup';
        }
        if (ruleGroup.combinator === 'Condition') {
            return 'ConditionGroup';
        }
        if (ruleGroup.combinator === 'Then') {
            return 'ThenGroup';
        }
        if (ruleGroup.combinator === 'Else') {
            return 'ElseGroup';
        }
        return '';
        // console.log('ruleGroup:',ruleGroup)
        //
        // const path=ruleGroup.path as number[];
        // const length=path.length;
        // return 'level-'+length+'-group';
    }

    const handleAddGroup = (ruleGroup: RuleGroupType, parentPath: number[], query: RuleGroupType, context?: any) => {
        // console.log('parentPath:',parentPath)
        const ConGroup: RuleGroupType = {
            combinator: 'Condition',
            rules: [],
        }
        const YESGroup: RuleGroupType = {
            combinator: 'Then',
            rules: [],
        }
        const NOGroup: RuleGroupType = {
            combinator: 'Else',
            rules: [],
        }
        const parent=findPath(parentPath,query) as RuleGroupType;
        // console.log('parent:',parent);
        const parentCombinator=parent.combinator;
        if (parentCombinator==='Then'||parentCombinator==='Else'){
            return {combinator: 'if', rules: [ConGroup,YESGroup,NOGroup]};
        }
        return {combinator: '', rules: []};
    }

    const handleAddRule = (rule: RuleType, parentPath: number[], query: RuleGroupType, context?: any) => {
        // console.log('q:', q);
        return {field: '', operator: '', value: ''};
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
                                {/*<div style={{ whiteSpace: 'nowrap', marginRight: '10px' }}>Logic Target Name:</div>*/}
                                {/*<Input*/}
                                {/*    placeholder="Logic Target Name"*/}
                                {/*    value={ruleResult}*/}
                                {/*    onChange={(e) => setRuleResult(e.target.value)}*/}
                                {/*    style={{ marginBottom: '10px', marginRight: '10px', marginTop: '10px', width: '150px' }}*/}
                                {/*/>*/}
                                {/*<Button onClick={() => addToFeature(fields, setFields, ruleResult)} style={{backgroundColor: '#FDEBD0', marginRight: '10px'}}>+Feature</Button>*/}
                                {/*<SaveRuleButton />*/}
                            </div>

                            <div style={{ marginBottom: '10px' ,marginTop: '10px',marginLeft:'-140px'}}>
                                {/*<QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>*/}
                                    <QueryBuilderAntD>
                                        <QueryBuilder
                                            fields={fields}
                                            query={query}
                                            onQueryChange={(q: any) => QueryChangeHandler(q)}
                                            onAddGroup={(ruleGroup, parentPath, query, context) => handleAddGroup(ruleGroup, parentPath, query, context)}
                                            onAddRule={(rule, parentPath, query, context) => handleAddRule(rule, parentPath, query, context)}
                                            showNotToggle
                                            addRuleToNewGroups
                                            getRuleGroupClassname={ruleGroup => CustomGetRuleGroupClassname(ruleGroup)}
                                            // controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                                            controlElements={{
                                                addRuleAction: AddRuleButtons,
                                                addGroupAction: AddGroupButton,
                                                removeGroupAction: RemoveGroupButton,
                                                removeRuleAction: RemoveRuleButton,
                                                notToggle: NotToggle,
                                                combinatorSelector: CombinatorSelector,
                                                fieldSelector: CustomFieldSelector,
                                                operatorSelector: OperatorSelector,
                                                valueEditor: CustomValueEditor
                                            }}
                                        />
                                    </QueryBuilderAntD>
                                {/*</QueryBuilderDnD>*/}
                            </div>
                        </>
                }
                    { !isQueryBuilderVisible &&
                        <>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '0px',
                                marginBottom: '10px',
                                width: '800px'
                            }}>
                                <div style={{color: 'gray', textAlign: 'left'}}>
                                    <h1 style={{marginBottom: '10px'}}>To start:</h1>
                                    <ul style={{padding: 0, margin: 0, textAlign: 'left', paddingLeft: '20px'}}>
                                        <ul style={{marginBottom: '5px'}}><h2>1. Import your feature source</h2></ul>
                                        <ul style={{marginBottom: '5px'}}><h2>2. Create a new module</h2></ul>
                                        <ul style={{marginBottom: '5px'}}><h2>3. Add a logic to the module</h2></ul>
                                        <ul style={{marginBottom: '5px'}}><h2>4. Edit the Logic on the workspace</h2></ul>
                                    </ul>
                                </div>
                            </div>

                        </>
                    }
                </div>
            </div>
    );
};

export default CustomQueryBuilder;
