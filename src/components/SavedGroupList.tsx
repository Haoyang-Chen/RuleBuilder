import React, {useState} from 'react';
import {Button, List, Modal} from 'antd';
import {QueryBuilder, RuleGroupType} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";
import {fields} from "./QueryBuilder";
import {useAppContext} from "../AppContent";


const SavedGroupList= () => {
    const {
        query,
        setQuery,
        displayQuery,
        setDisplayQuery,
        savedGroups,
        setSavedGroups,
        checkGroupModalVisible,
        setCheckGroupModalVisible}=useAppContext();


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


    return (
        <>
        <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px' }}>
            <h3>Saved Groups</h3>
                <List
                    dataSource={savedGroups}
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
                title="Check Group"
                visible={checkGroupModalVisible}
                // onCancel={handleModalCheckCancel}
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
                        addRuleAction: () => null, // Hide add rule button
                    }}/>
            </Modal></>

    );
};

export default SavedGroupList;
