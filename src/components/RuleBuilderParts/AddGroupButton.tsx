import {ActionWithRulesAndAddersProps, add, RuleGroupType} from "react-querybuilder";
import {Button} from "antd";
import React from "react";
import {useAppContext} from "../../AppContent";

const AddGroupButton = (props: ActionWithRulesAndAddersProps) => {
    const {
        query,
        setQuery,
        ruleResult,
        setRuleResult,
        fields,
        logic,
        isQueryBuilderVisible,
    }=useAppContext();
    const group=props.ruleOrGroup as RuleGroupType;
    // console.log('group:',group);
    const combinator=group.combinator;
    let isIfGroup=false;
    if (combinator==='IF'){
        isIfGroup=true;
    }
    let isCondition=false;
    if (combinator==='Condition'){
        isCondition=true;
    }
    const handleAddResult=()=>{
        const newQuery=add(query,{ field: '', operator: 'Result', value: '' },props.path);
        setQuery(newQuery);
    }

    return (
        <>
            {
                !isIfGroup &&
                <>
                    <Button onClick={props.handleOnClick} type={'primary'}>+Nested Rules</Button>
                    <>
                        {
                            !isCondition &&
                            <Button onClick={handleAddResult} type={'dashed'}>+Result</Button>
                        }
                    </>
                </>
            }
        </>
    );
}
export default AddGroupButton;