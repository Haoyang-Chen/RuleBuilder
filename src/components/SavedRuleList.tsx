import React from 'react';
import {Button, Input, List, Modal, Popover, Tooltip} from 'antd';
import {QueryBuilder} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";
import {useAppContext} from "../AppContent";
import {CombinatorSelector, CustomValueEditor, operatorSelector} from "./QueryBuilder";


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
                <QueryBuilder
                    fields={fields}
                    query={displayQuery}
                    onQueryChange={(q: any) => setDisplayQuery(q)}
                    controlElements={{
                        combinatorSelector: CombinatorSelector,
                        operatorSelector: operatorSelector
                    }}/>
            </Modal></>

    );
};



export default SavedRuleList;
