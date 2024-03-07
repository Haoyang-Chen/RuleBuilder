import React, {useState} from 'react';
import {Button, List, Modal, Popover} from 'antd';
import {QueryBuilder, RuleGroupType} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";
import {useAppContext} from "../AppContent";
import {CombinatorSelector, CustomValueEditor, operatorSelector} from "./QueryBuilder";


const SavedGroupList= () => {
    const {
        query,
        setQuery,
        displayQuery,
        setDisplayQuery,
        savedGroups,
        setSavedGroups,
        checkGroupModalVisible,
        setCheckGroupModalVisible,
        fields}=useAppContext();


    const handleCheck = (index: number) => {
        const savedQuery = savedGroups[index];
        const parsedQuery = JSON.parse(savedQuery.query);
        setDisplayQuery(parsedQuery);
        setCheckGroupModalVisible(true);
    };

    const handleLoad = () => {
        const newGroup: RuleGroupType = {
            combinator: 'and',
            rules: displayQuery.rules,
        };

        const newQuery: RuleGroupType = {
            combinator: 'and',
            rules: [...query.rules, newGroup],
        };
        setQuery(newQuery);
    };

    const handleModalCheckOk = () => {
        setCheckGroupModalVisible(false);
        handleLoad();
    };

    const handleModalCheckCancel = () => {
        setCheckGroupModalVisible(false);
    };

    const handleDeleteGroup = (index: number) => {
        const newSavedQueries = [...savedGroups];
        newSavedQueries.splice(index, 1);
        setSavedGroups(newSavedQueries);
    };

    const checkRule = (index: number) => {
        return (
            <>
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
        <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px', backgroundColor: '#D5F5E3'}}>
            <h3>Saved Groups</h3>
                <List
                    dataSource={savedGroups}
                    locale={{ emptyText: ' ' }}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Popover content={checkRule(index)} trigger="hover" placement={"bottom"}>
                                    <Button onClick={() => handleCheck(index)}>Edit</Button>
                                </Popover>,
                                <Button onClick={() => handleLoad()}>Insert</Button>,
                                <Button onClick={() => handleDeleteGroup(index)}>x</Button>
                            ]}
                        >
                            {item.name}
                        </List.Item>
                    )}/>
            </div>
            <Modal
                title="Check Group"
                visible={checkGroupModalVisible}
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

export default SavedGroupList;
