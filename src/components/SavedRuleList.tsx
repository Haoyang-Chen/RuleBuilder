import React from 'react';
import {Button, Input, List, Modal, Popover} from 'antd';
import {QueryBuilder} from "react-querybuilder";
import {useAppContext} from "../AppContent";
import {CombinatorSelector, operatorSelector} from "./QueryBuilder";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import {QueryBuilderAntD} from "@react-querybuilder/antd";
import {QueryBuilderDnD} from "@react-querybuilder/dnd";


const SavedRuleList= () => {
    const {
        query,
        setQuery,
        displayQuery,
        setDisplayQuery,
        savedRules,
        setSavedRules,
        checkRuleModalVisible,
        setCheckRuleModalVisible,
        setRuleResult,
        displayResult,
        setDisplayResult,
        fields}=useAppContext();


    const handleCheck = (index: number) => {
        const savedQuery = savedRules[index];
        const parsedQuery = JSON.parse(savedQuery.query);
        setDisplayQuery(parsedQuery);
        setDisplayResult(savedQuery.result);
        setCheckRuleModalVisible(true);
    };

    const handleLoad = () => {
        setRuleResult(displayResult);
        setQuery(displayQuery);
    };

    const handleModalCheckOk = () => {
        setCheckRuleModalVisible(false);
        handleLoad();
    };

    const handleModalCheckCancel = () => {
        setCheckRuleModalVisible(false);
    };

    const handleDeleteGroup = (index: number) => {
        const newSavedQueries = [...savedRules];
        newSavedQueries.splice(index, 1);
        setSavedRules(newSavedQueries);
    };

    const checkRule = (index: number) => {
        return (
            <>
                Result Name: {displayResult}
                <QueryBuilder
                fields={fields}
                query={displayQuery}
                onQueryChange={(q: any) => setDisplayQuery(q)}
                controlElements={{
                    addRuleAction: () => null,
                    addGroupAction: () => null,
                }}/>
            </>
        )
    }


    return (
        <>
            <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px', backgroundColor: '#EBF5FB'}}>
                <h3>Saved Rules</h3>
                <List
                    dataSource={savedRules}
                    locale={{ emptyText: ' ' }}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Popover content={checkRule(index)} trigger="hover" placement={"bottom"}>
                                    <Button onClick={() => handleCheck(index)}>Edit</Button>
                                </Popover>,
                                <Button onClick={() => handleLoad()}>Load</Button>,
                                <Button onClick={() => handleDeleteGroup(index)}>x</Button>
                            ]}
                        >
                            {item.name}
                        </List.Item>
                    )}/>
            </div>
            <Modal
                title="Check Rule"
                visible={checkRuleModalVisible}
                onCancel={handleModalCheckCancel}
                footer={[
                    <Button key="cancel" onClick={handleModalCheckCancel}>
                        Cancel
                    </Button>,
                    <Button key="load" type="primary" onClick={handleModalCheckOk}>
                        Load
                    </Button>,
                ]}
            >
                <Input
                    placeholder="Result Name"
                    value={displayResult}
                    onChange={(e) => setDisplayResult(e.target.value)}
                    style={{ marginBottom: '10px' ,marginTop: '10px'}}
                />
                <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
                    <QueryBuilderAntD>
                        <QueryBuilder
                            fields={fields}
                            query={displayQuery}
                            onQueryChange={(q: any) => setDisplayQuery(q)}
                            controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                            controlElements={{
                                combinatorSelector: CombinatorSelector,
                                operatorSelector: operatorSelector
                            }}
                        />
                    </QueryBuilderAntD>
                </QueryBuilderDnD>
            </Modal></>

    );
};



export default SavedRuleList;
