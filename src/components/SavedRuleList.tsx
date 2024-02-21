import React from 'react';
import {Button, Input, List, Modal} from 'antd';
import {QueryBuilder, RuleGroupType} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";
import {fields} from "./Fields";
import {useAppContext} from "../AppContent";


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
        setResult,
        displayResult,
        setDisplayResult}=useAppContext();


    const handleCheck = (index: number) => {
        const savedQuery = savedRules[index];
        const parsedQuery = JSON.parse(savedQuery.query);
        setDisplayQuery(parsedQuery);
        setDisplayResult(savedQuery.result);
        setCheckRuleModalVisible(true);
    };

    const handleLoad = () => {
        setResult(displayResult);
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


    return (
        <>
            <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px' }}>
                <h3>Saved Rules</h3>
                <List
                    dataSource={savedRules}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Button onClick={() => handleCheck(index)}>Check</Button>,
                                <Button onClick={() => handleDeleteGroup(index)}>Delete</Button>
                            ]}
                        >
                            {item.name}
                        </List.Item>
                    )}/>
            </div>
            <Modal
                title="Check Rule"
                visible={checkRuleModalVisible}
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
                        addRuleAction: () => null, // Hide add rule button
                    }}/>
            </Modal></>

    );
};

export default SavedRuleList;
