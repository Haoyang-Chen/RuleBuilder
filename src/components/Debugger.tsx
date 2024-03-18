import React from 'react';
import {useAppContext} from "../AppContent";
import {formatQuery} from "react-querybuilder";
import {Button, List, Tooltip} from "antd";

const Debugger= () => {
    const {query, ruleResult,operationResultName,logic}=useAppContext();
    const {fields,setFields,originField}=useAppContext();
    //the added fields refer to the features that are added apart from the original features = fields-originfield
    const addedFields=fields.filter((field)=>!originField.includes(field));

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px',marginTop:'30px' }}>
                <div style={{border: '2px solid #ccc', borderRadius: '8px', padding: '10px', width: '1000px'}}>
                    <h3>Logic in SpEL format</h3>
                    <code>{formatQuery(query, 'spel')}</code><span title='result name'
                                                                   style={{color: 'red'}}> =={'>'} {ruleResult} </span>
                    <h3>Operation Result Name</h3>
                    {/*<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>*/}
                    {/*    {operationResultName.map((item, index) => (*/}
                    {/*        <div key={index}*/}
                    {/*             style={{marginBottom: '10px', display: 'flex', alignItems: 'center', width: '100%'}}>*/}
                    {/*            <div style={{marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>{item.name}:*/}
                    {/*            </div>*/}
                    {/*            <div style={{fontSize: '20px'}}>*/}
                    {/*                {item.rule.field} <span*/}
                    {/*                style={{margin: '0 4px'}}>{item.rule.operator}</span> {item.rule.value}*/}
                    {/*            </div>*/}
                    {/*            <span style={{marginLeft: "auto"}}>{item.id}</span>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        {logic.operations.map((item, index) => (
                            <div key={index}
                                 style={{marginBottom: '10px', display: 'flex', alignItems: 'center', width: '100%'}}>
                                <div style={{marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>{item.name}:
                                </div>
                                <div style={{fontSize: '20px'}}>
                                    {item.left} <span
                                    style={{margin: '0 4px'}}>{item.mid}</span> {item.right}
                                </div>
                                <span style={{marginLeft: "auto"}}>{item.id}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{
                    }}>
                        <h3>Saved Feature</h3>
                        <List
                            dataSource={addedFields}
                            locale={{emptyText: 'Empty'}}
                            renderItem={(item, index) => (
                                <List.Item
                                    style={{display: 'flex', alignItems: 'center'}}
                                >
                                    <Tooltip title={item.name} placement={"left"}>
                                        name: {item.label}
                                        <br/>
                                        description: {item.name}
                                    </Tooltip>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Debugger;
