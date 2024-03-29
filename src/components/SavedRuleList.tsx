import React from 'react';
import {Button, Popover, Collapse, message} from 'antd';
import {QueryBuilder, RuleGroupType} from "react-querybuilder";
import {useAppContext} from "../AppContent";
import CombinatorSelector from "./RuleBuilderParts/CombinatorSelector";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import {QueryBuilderAntD} from "@react-querybuilder/antd";
import {QueryBuilderDnD} from "@react-querybuilder/dnd";
import { v4 as uuidv4 } from 'uuid';
import OperatorSelector from "./RuleBuilderParts/OperatorSelector";
import AddRuleButtons from "./RuleBuilderParts/AddRuleButtons";
import AddGroupButton from "./RuleBuilderParts/AddGroupButton";
import NotToggle from "./RuleBuilderParts/NotToggle";
import CustomFieldSelector from "./RuleBuilderParts/CustomFieldSelector";
import CustomValueEditor from "./RuleBuilderParts/CustomValueEditor";
import RemoveGroupButton from "./RuleBuilderParts/RemoveGroupButton";


const { Panel } = Collapse;

const SavedRuleList= () => {
    const {
        setQuery,
        setRuleResult,
        fields,
        setFields,
        modules,
        setModules,
        setLogic,
        activePanels,
        setActivePanels,
        setIsQueryBuilderVisible,
        query,
        logic,
        ruleResult
    }=useAppContext();


    // const handleCheck = (module_index: number,idx:number) => {
    //     console.log(module_index);
    //     console.log(idx);
    //     console.log(modules[module_index].logics[idx]);
    //     const savedQuery = modules[module_index].logics[idx];
    //     const parsedQuery = savedQuery.logicQuery;
    //     setDisplayQuery(parsedQuery);
    //     setDisplayResult(savedQuery.logicName);
    //     setCheckRuleModalVisible(true);
    // };
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


    const handleDirectLoad = (module_index: number,idx:number) => {
        handleSaveRule();
        setLogic(modules[module_index].logics[idx]);
        setQuery(modules[module_index].logics[idx].logicQuery);
        setRuleResult(modules[module_index].logics[idx].logicName);
        setIsQueryBuilderVisible(true);
    };



    const handleDeleteGroup = (module_index: number,idx:number) => {
        modules[module_index].logics.splice(idx, 1);
        setModules([...modules]);
    };

    const handleAddModule = () => {
        const moduleName=window.prompt("Please enter module name");
        if(moduleName){
            let exist=false;
            modules.forEach((module)=>{
                if(module.name===moduleName){
                    exist=true;
                }
            });
            if(exist){
                alert("Module name already exists");
                return;
            }
            setModules([...modules,{name:moduleName,logics:[]}]);
        }else{
            message.error("Module name cannot be empty");
        }
    };

    const handleAddLogic = (index:number) => {
        const logicName=window.prompt("Enter Logic name");
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
        if (!logicName || !logicName.trim()) {
            window.alert('Name cannot be empty');
            return -1;
        }
        // const name = window.prompt("Enter Description:");
        // if (!name || !name.trim()) {
        //     window.alert('Description cannot be empty');
        //     return -1;
        // }
        const logicID=uuidv4();
        if(logicName){
            // const newField={id:logicID,name:name,label:logicName};
            // setFields([...fields,newField])
            setModules(modules.map((module, module_index) => {
                if (module_index === index) {
                    module.logics.push({id: logicID,logicName:logicName,logicQuery:{combinator: 'if', rules: [ConGroup,YESGroup,NOGroup]},operations:[]});
                }
                return module;
            }));

            setActivePanels(prevActivePanels => {
                // console.log(prevActivePanels);
                // console.log(index.toString());
                // console.log(prevActivePanels.includes(index.toString()));
                if (!prevActivePanels.includes(index.toString())) {
                    return [...prevActivePanels, index.toString()];
                }
                return prevActivePanels;
            });
        }
    }


    const handlePanelChange = (keys: string|string[]) => {
        setActivePanels(keys);
    };


    return (
        <>

            <div style={{
                border: '2px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginTop: '20px',
                backgroundColor: '#EBF5FB'
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3>Saved Steps</h3>
                    <Button onClick={handleAddModule} style={{marginLeft:'21px'}} type={"primary"}>+Step</Button>
                </div>

                <Collapse accordion={false}
                          activeKey={activePanels}
                          onChange={handlePanelChange}>
                    {modules.map((module, module_index) => (
                        <Panel header={(
                            <span>
                                {module.name}
                            </span>
                        )} key={module_index}>
                            <ul style={{
                                paddingLeft: '0px',
                                marginTop: '5px',
                                marginBottom: '5px',
                                marginLeft: '5px',
                                marginRight: '5px'
                            }} key={module_index}>
                                {module.logics.map((logic, idx) => (
                                    <>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '5px',
                                            marginBottom: '5px',
                                            marginLeft: '5px',
                                            marginRight: '5px'
                                        }}>
                                            <div style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                                                <ul key={idx} style={{
                                                    paddingLeft: '0px',
                                                    marginRight: '5px',
                                                    marginBottom: 0
                                                }}>{logic.logicName}</ul>
                                            </div>
                                            <div>
                                                {/*<Popover content={<CheckRuleContent module_index={module_index}*/}
                                                {/*                                    index={idx}/>} trigger="hover"*/}
                                                {/*         placement={"bottom"}>*/}
                                                {/*    <Button onClick={() => handleCheck(module_index, idx)}*/}
                                                {/*            style={{marginRight: '5px'}}>Edit</Button>*/}
                                                {/*</Popover>*/}
                                                <Popover content={<CheckRuleContent module_index={module_index} index={idx}/>}
                                                         trigger="hover"
                                                         placement={"right"}>
                                                    <Button onClick={() => handleDirectLoad(module_index, idx)}
                                                            style={{marginRight: '5px'}}>Edit</Button>
                                                </Popover>
                                                <Button onClick={() => handleDeleteGroup(module_index, idx)}
                                                        type={"text"}>x</Button>
                                            </div>
                                            {/*<EditRuleModal module_index={module_index} index={idx}/>*/}
                                        </div>
                                        <div style={{height: '5px'}}/>
                                    </>
                                ))}
                            </ul>
                            <div style={{height: '5px'}}/>
                            <Button onClick={() => handleAddLogic(module_index)} type={'primary'}>+Logic</Button>
                        </Panel>
                    ))}
                </Collapse>

            </div>
            </>

    );
};

// const EditRuleModal = ({ module_index,index }: { module_index: number,index:number }) => {
//     const {
//         setQuery,
//         displayQuery,
//         setDisplayQuery,
//         setRuleResult,
//         displayResult,
//         setDisplayResult,
//         fields,
//         modules,
//         setModules,
//         checkRuleModalVisible,
//         setCheckRuleModalVisible,
//         setLogic
//     } = useAppContext();
//
//     const handleLoad = () => {
//         const newLogic={id:modules[module_index].logics[index].id, logicName:displayResult, logicQuery:displayQuery, operations:modules[module_index].logics[index].operations};
//         const newModules=modules.map((module)=>{
//             if(module.name===modules[module_index].name){
//                 return {...module, logics:module.logics.map((item)=>{
//                         if(item.id===modules[module_index].logics[index].id){
//                             return newLogic;
//                         }
//                         return item;
//                     })};
//             }
//             return module;
//         });
//         setModules(newModules);
//
//         setLogic(modules[module_index].logics[index]);
//         setRuleResult(displayResult);
//         setQuery(displayQuery);
//     };
//
//     const handleModalCheckOk = () => {
//         setCheckRuleModalVisible(false);
//         handleLoad();
//     };
//
//     const handleModalCheckCancel = () => {
//         setCheckRuleModalVisible(false);
//     };
//
//     const handleQueryChange = (q: any) => {
//         setDisplayQuery(q);
//     }
//
//     return(
//         <Modal
//             title="Check Rule"
//             visible={checkRuleModalVisible}
//             onCancel={handleModalCheckCancel}
//             footer={[
//                 <Button key="cancel" onClick={handleModalCheckCancel}>
//                     Cancel
//                 </Button>,
//                 <Button key="load" type="primary" onClick={handleModalCheckOk}>
//                     Load
//                 </Button>,
//             ]}
//         >
//             <Input
//                 placeholder="Result Name"
//                 value={displayResult}
//                 onChange={(e) => setDisplayResult(e.target.value)}
//                 style={{ marginBottom: '10px' ,marginTop: '10px'}}
//             />
//             <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
//                 <QueryBuilderAntD>
//                     <QueryBuilder
//                         fields={fields}
//                         query={displayQuery}
//                         onQueryChange={(q: any) => handleQueryChange(q)}
//                         controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
//                         controlElements={{
//                             combinatorSelector: CombinatorSelector,
//                             operatorSelector: operatorSelector
//                         }}
//                     />
//                 </QueryBuilderAntD>
//             </QueryBuilderDnD>
//         </Modal>
//     )
// }

const CheckRuleContent = ({ module_index,index }: { module_index: number,index:number }) => {
    const { modules, fields,setDisplayQuery } = useAppContext();
    const savedRule = modules[module_index].logics[index];
    const parsedRule = savedRule.logicQuery;

    return (
        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
            <QueryBuilderAntD>
                <QueryBuilder
                    fields={fields}
                    query={parsedRule}
                    onQueryChange={(q: any) => setDisplayQuery(q)}
                    controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                    controlElements={{
                        addRuleAction: AddRuleButtons,
                        addGroupAction: AddGroupButton,
                        removeGroupAction: RemoveGroupButton,
                        notToggle: NotToggle,
                        combinatorSelector: CombinatorSelector,
                        fieldSelector: CustomFieldSelector,
                        operatorSelector: OperatorSelector,
                        valueEditor: CustomValueEditor
                    }}
                />
            </QueryBuilderAntD>
        </QueryBuilderDnD>
    );
};


export default SavedRuleList;




