import {ActionWithRulesAndAddersProps, RuleGroupArray, RuleGroupType} from "react-querybuilder";
import {Button} from "antd";
import React from "react";
import {useAppContext} from "../../AppContent";

const AddRuleButtons = (props: ActionWithRulesAndAddersProps) => {
    const {
        query,
        setDisplayQuery,
    }=useAppContext();
    // const handleSaveGroup = () => {
    //     setSaveGroupModalVisible(true);
    // };
    // const group= props.rules;
    // console.log(props)
    const handleCopy=()=>{
        // setDisplayQuery();
        // console.log('group:',group);
        console.log('query:',query);
        const rule = props.rules as RuleGroupArray
        console.log('rule:',rule);
        if(rule){
            const newGroup: RuleGroupType = {
                combinator: 'and',
                rules: rule,
            };
            setDisplayQuery(newGroup);
        }
    };

    const group=props.ruleOrGroup as RuleGroupType;
    // console.log('group:',group);
    const combinator=group.combinator;
    let isIfGroup=false;
    if (combinator==='IF'||combinator==='Then'||combinator==='Else'){
        isIfGroup=true;
    }

    return(
        <>
            { !isIfGroup &&
                <>
                    {/*<Button onClick={handleSaveGroup} style={{backgroundColor: '#D5F5E3'}}>Save Group</Button>*/}
                    {/*<Button onClick={handleCopy} style={{backgroundColor: '#D5F5E3'}}>Copy</Button>*/}
                    <Button onClick={(e) => props.handleOnClick(e)}>+Rule</Button>
                </>
            }
        </>
    );
};
export default AddRuleButtons;