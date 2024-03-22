import {NotToggleProps, RuleGroupType} from "react-querybuilder";
import {AntDNotToggle} from "@react-querybuilder/antd";
import React from "react";

const NotToggle = (props: NotToggleProps) => {
    const group=props.ruleGroup as RuleGroupType;
    // console.log('group:',group);
    const combinator=group.combinator;
    let isIfGroup=false;
    if (combinator==='IF' || combinator==='Then' || combinator==='Else'){
        isIfGroup=true;
    }

    return (
        <>
            {
                !isIfGroup &&
                <AntDNotToggle {...props} />
            }
        </>
    );
}
export default NotToggle;