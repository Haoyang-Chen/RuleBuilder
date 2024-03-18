import React from 'react';
import {Button} from 'antd';
import {QueryBuilder, RuleGroupType} from "react-querybuilder";
import {useAppContext} from "../AppContent";
import {CombinatorSelector, operatorSelector} from "./QueryBuilder";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import {QueryBuilderAntD} from "@react-querybuilder/antd";
import {QueryBuilderDnD} from "@react-querybuilder/dnd";


const ClipBoard= () => {
    const {
        query,
        setQuery,
        displayQuery,
        setDisplayQuery,
        fields,
        isQueryBuilderVisible,
    }=useAppContext();

    const handleDirectLoad = () => {

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

    return (


            <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px', backgroundColor: '#D5F5E3', width:'400px'}}>
                <div style={{display:'flex', alignItems: 'center'}}>
                    <h3>ClipBoard</h3>
                    { isQueryBuilderVisible &&
                    <Button style={{marginLeft:'auto'}} onClick={handleDirectLoad}>Paste to Bottom</Button>
                    }
                </div>
                { isQueryBuilderVisible &&
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
                }
            </div>

    );
};


export default ClipBoard;
