import React from 'react';
import {Button} from 'antd';
import {QueryBuilder, RuleGroupType} from "react-querybuilder";
import {useAppContext} from "../AppContent";
import {QueryBuilderAntD} from "@react-querybuilder/antd";
import AddRuleButtons from "./RuleBuilderParts/AddRuleButtons";
import AddGroupButton from "./RuleBuilderParts/AddGroupButton";
import NotToggle from "./RuleBuilderParts/NotToggle";
import CombinatorSelector from "./RuleBuilderParts/CombinatorSelector";
import CustomFieldSelector from "./RuleBuilderParts/CustomFieldSelector";
import OperatorSelector from "./RuleBuilderParts/OperatorSelector";
import CustomValueEditor from "./RuleBuilderParts/CustomValueEditor";

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
                                addRuleAction: AddRuleButtons,
                                addGroupAction: AddGroupButton,
                                notToggle: NotToggle,
                                combinatorSelector: CombinatorSelector,
                                fieldSelector: CustomFieldSelector,
                                operatorSelector: OperatorSelector,
                                valueEditor: CustomValueEditor
                            }}
                        />
                    </QueryBuilderAntD>
                }
            </div>

    );
};


export default ClipBoard;
