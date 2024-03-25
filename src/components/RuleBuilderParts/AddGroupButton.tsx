import {ActionWithRulesAndAddersProps, add, RuleGroupType} from "react-querybuilder";
import {Button} from "antd";
import React from "react";
import {useAppContext} from "../../AppContent";
import {Field} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";

const AddGroupButton = (props: ActionWithRulesAndAddersProps) => {
    const {
        query,
        setQuery,
    }=useAppContext();

    const group=props.ruleOrGroup as RuleGroupType;
    // console.log('group:',group);
    const combinator=group.combinator;
    let isLast=false;
    if (group.rules.length===0 || (group.combinator!=='Condition'&&group.combinator!=='if'&&group.combinator!=='Then'&&group.combinator!=='Else')){
        isLast=true;
    }

    let isIfGroup=false;

    if (combinator==='if'||combinator===''){
        isIfGroup=true;
    }
    let isCondition=false;
    if (combinator!=='if'&&combinator!=='Then'&&combinator!=='Else'&&combinator!==''){
        isCondition=true;
    }
    const handleAddResult=()=>{
        const newQuery=add(query,{ field: '', operator: 'Result', value: '' },props.path);
        setQuery(newQuery);
    }

    if (isIfGroup){
        return (
            <></>
        );
    }else {
        if (isLast){
            return (
                <>
                    <Button onClick={props.handleOnClick}>+Nested Rules</Button>
                    <>
                        {
                            !isCondition &&
                            <Button onClick={handleAddResult} type={'dashed'}>+Result</Button>
                        }
                    </>
                </>
            );
        }
        else{
            return (
                <>
                    {
                        !isCondition &&
                        <Button onClick={handleAddResult} type={'dashed'}>+Result</Button>
                    }
                </>
            )
        }
    }

    // return (
    //     <>
    //         {
    //             (!isIfGroup && isLast) &&
    //             <>
    //                 <Button onClick={props.handleOnClick}>+Nested Rules</Button>
    //                 <>
    //                     {
    //                         !isCondition &&
    //                         <Button onClick={handleAddResult} type={'dashed'}>+Result</Button>
    //                     }
    //                 </>
    //             </>
    //         }
    //     </>
    // );
}
export default AddGroupButton;