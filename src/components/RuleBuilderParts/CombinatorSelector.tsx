import {add, CombinatorSelectorProps, findPath, OptionList, remove, RuleGroupType, update} from "react-querybuilder";
import {useAppContext} from "../../AppContent";
import {AntDValueSelector} from "@react-querybuilder/antd";
import React from "react";

export const CombinatorSelector = (props: CombinatorSelectorProps) => {
    const {
        query,
        setQuery,
    } = useAppContext();

    const path = props.path;

    let options: OptionList = [
        { name: 'IF', label: 'if'},
        { name: 'And', label: 'and' },
        { name: 'Or', label: 'or' },
        { name:'Gor2', label:'GOR2'}
    ];

    const handleOnChange = (value: string) => {
        const oldgroup=findPath(path,query) as RuleGroupType;
        const oldCombinator=oldgroup.combinator;
        props.handleOnChange(value);

        if (oldCombinator==='IF' && value!=='IF'){
            const targetGroup=findPath(path,query) as RuleGroupType;
            let newQuery=query;
            for (let i=0;i<targetGroup.rules.length;i++) {
                newQuery = remove(newQuery, [...path, 0]);
            }
            newQuery=update(newQuery,'combinator',value,path);
            setQuery(newQuery);
        }

        if (value==='IF'){
            const ConGroup: RuleGroupType = {
                combinator: 'Condition',
                rules: [],
            }
            const YESGroup: RuleGroupType = {
                combinator: 'Then',
                rules: [],
            }
            const NOGroup: RuleGroupType = {
                combinator: 'Else',
                rules: [],
            }
            let newQuery=query;
            const targetGroup=findPath(path,query) as RuleGroupType;
            for (let i=0;i<targetGroup.rules.length;i++) {
                newQuery = remove(newQuery, [...path, 0]);
            }
            newQuery=update(newQuery,'combinator','IF',path);
            newQuery=add(newQuery,ConGroup,path);
            newQuery=add(newQuery,YESGroup,path);
            newQuery=add(newQuery,NOGroup,path);
            setQuery(newQuery);
        }
    }
    const level=props.level
    if (level===0){
        options= [{ name: 'IF', label: 'if'}];
    }
    if (props.value==='Condition'||props.value==='Then'||props.value==='Else'){
        options=[{name:props.value.toUpperCase(),label:props.value}];
    }

    return (
        <>
            {
                <AntDValueSelector
                    {...props}
                    options={options}
                    value={props.value}
                    handleOnChange={handleOnChange}
                />
            }
        </>
    );
};
export default CombinatorSelector;