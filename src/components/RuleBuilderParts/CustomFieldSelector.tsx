import {FieldSelectorProps} from "react-querybuilder";
import {CustomValueSelector} from "../CustomValueSelector";
import React from "react";

const CustomFieldSelector = (props: FieldSelectorProps) => {
    if (props.operator==='Result'){
        return null;
    }
    return (
        <div style={{ width: '150px' }}>
            <CustomValueSelector {...props} style={{ width: '100%' }} />
        </div>
    );
};
export default CustomFieldSelector;
