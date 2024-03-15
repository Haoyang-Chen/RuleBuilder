import React from 'react';
import {Button, List, Modal, Popover} from 'antd';
import {QueryBuilder, RuleGroupType} from "react-querybuilder";
import {useAppContext} from "../AppContent";
import {CombinatorSelector, operatorSelector} from "./QueryBuilder";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import {QueryBuilderAntD} from "@react-querybuilder/antd";
import {QueryBuilderDnD} from "@react-querybuilder/dnd";


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

    const handleDirectLoad = (index:number) => {
        const savedQuery = savedGroups[index];
        const parsedQuery = JSON.parse(savedQuery.query);

        const newGroup: RuleGroupType = {
            combinator: 'and',
            rules: parsedQuery.rules,
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
        <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px', backgroundColor: '#D5F5E3'}}>
            <h3>Saved Group</h3>
                <List
                    dataSource={savedGroups}
                    locale={{ emptyText: 'Empty' }}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Popover content={<CheckRuleContent index={index} />} trigger="hover" placement={"bottom"}>
                                    <Button onClick={() => handleCheck(index)}>Edit</Button>
                                </Popover>,
                                <Button onClick={() => handleDirectLoad(index)}>Insert</Button>,
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
                    <Button key="Insert" type="primary" onClick={handleModalCheckOk}>
                        Insert
                    </Button>,
                ]}
            >
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

const CheckRuleContent = ({ index }: { index: number }) => {
    const { savedGroups, fields,setDisplayQuery } = useAppContext();
    const savedQuery = savedGroups[index];
    const parsedQuery = JSON.parse(savedQuery.query);

    return (
        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
            <QueryBuilderAntD>
                <QueryBuilder
                    fields={fields}
                    query={parsedQuery}
                    onQueryChange={(q: any) => setDisplayQuery(q)}
                    controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                    controlElements={{
                        combinatorSelector: CombinatorSelector,
                        operatorSelector: operatorSelector,
                        addRuleAction: () => null,
                        addGroupAction: () => null,
                    }}
                />
            </QueryBuilderAntD>
        </QueryBuilderDnD>
    );
};

export default SavedGroupList;
