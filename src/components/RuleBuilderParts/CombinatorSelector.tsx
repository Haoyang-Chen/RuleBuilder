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
    const parentPath = path.slice(0, -1);
    const parentGroup = findPath(parentPath, query) as RuleGroupType;
    const parentCombinator = parentGroup.combinator;

    let options: OptionList = [
        { name: 'And', label: 'and' },
        { name: 'Or', label: 'or' },
        { name:'G-or-2', label:'G-or-2'}
    ];

    const handleOnChange = (value: string) => {
        const oldgroup=findPath(path,query) as RuleGroupType;
        const oldCombinator=oldgroup.combinator;
        props.handleOnChange(value);

        if (oldCombinator==='if' && value!=='if'){
            const targetGroup=findPath(path,query) as RuleGroupType;
            let newQuery=query;
            for (let i=0;i<targetGroup.rules.length;i++) {
                newQuery = remove(newQuery, [...path, 0]);
            }
            newQuery=update(newQuery,'combinator',value,path);
            setQuery(newQuery);
        }

        if (value==='if'){
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
            newQuery=update(newQuery,'combinator','if',path);
            newQuery=add(newQuery,ConGroup,path);

            newQuery=add(newQuery,YESGroup,path);
            newQuery=add(newQuery,NOGroup,path);
            setQuery(newQuery);
        }
    }


    const level=props.level
    if (level===0){
        options= [{ name: 'if', label: 'if'}];
    }
    if (props.value==='Condition'||props.value==='Then'||props.value==='Else'){
        options=[{name:props.value,label:props.value}];
    }
    if (parentCombinator==='Then'||parentCombinator==='Else'){
        options=[{name:'if',label:'if'}];
    }
    if (parentCombinator==='Condition'){
        options=[
            { name: 'And', label: 'and' },
            { name: 'Or', label: 'or' },
            { name:'G-or-2', label:'G-or-2'}];
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