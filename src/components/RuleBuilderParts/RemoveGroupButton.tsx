import {ActionWithRulesAndAddersProps, RuleGroupType} from "react-querybuilder";
import {Button} from "antd";
import React from "react";

const RemoveGroupButton = (props: ActionWithRulesAndAddersProps) => {

    return (
        <>
            {
                props.level!==1 &&
                <Button onClick={props.handleOnClick} type={'primary'} style={{marginLeft:"auto"}}>x</Button>
            }
        </>
    );
}
export default RemoveGroupButton;