import React, { createContext, useContext, useState, ReactNode } from 'react';
import {RuleGroupType, RuleType} from "react-querybuilder";
import {Field} from "react-querybuilder/dist/cjs/react-querybuilder.cjs.development";
// import {ECGfields} from "./components/Fields";

interface StateContextType {
    query: RuleGroupType;
    setQuery: React.Dispatch<React.SetStateAction<RuleGroupType>>;
    displayQuery: RuleGroupType;
    setDisplayQuery: React.Dispatch<React.SetStateAction<RuleGroupType>>;
    savedGroups: { name: string; query: string }[];
    setSavedGroups: React.Dispatch<React.SetStateAction<{ name: string; query: string }[]>>;
    savedRules: { name: string; result: string; query: string }[];
    setSavedRules: React.Dispatch<React.SetStateAction<{ name: string; result: string, query: string }[]>>;
    ruleResult: string;
    setRuleResult: React.Dispatch<React.SetStateAction<string>>;
    displayResult: string;
    setDisplayResult: React.Dispatch<React.SetStateAction<string>>;
    saveGroupModalVisible: boolean;
    setSaveGroupModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    saveRuleModalVisible: boolean;
    setSaveRuleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    checkGroupModalVisible: boolean;
    setCheckGroupModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    checkRuleModalVisible: boolean;
    setCheckRuleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    groupName: string;
    setGroupName: React.Dispatch<React.SetStateAction<string>>;
    ruleName: string;
    setRuleName: React.Dispatch<React.SetStateAction<string>>;
    operationResultName: {name:string,rule: any, id:string}[];
    setOperationResultName: React.Dispatch<React.SetStateAction<{name:string,rule: any, id:string}[]>>;
    fields: Field[];
    setFields: React.Dispatch<React.SetStateAction<Field[]>>;
    originField: Field[];
    setOriginField: React.Dispatch<React.SetStateAction<Field[]>>;
    modules:{name: string ,logics:{id:string, logicName:string, logicQuery:RuleGroupType, operations:{id:string,left:string,mid:string,right:string,name:string}[]}[]}[];
    setModules: React.Dispatch<React.SetStateAction<{name: string ,logics:{id:string, logicName:string, logicQuery:RuleGroupType, operations:{id:string,left:string,mid:string,right:string,name:string}[]}[]}[]>>;
    logic:{id:string, logicName:string, logicQuery:RuleGroupType, operations:{id:string,left:string,mid:string,right:string,name:string}[]};
    setLogic: React.Dispatch<React.SetStateAction<{id:string, logicName:string, logicQuery:RuleGroupType, operations:{id:string,left:string,mid:string,right:string,name:string}[]}>>;
    activePanels: string|string[];
    setActivePanels: React.Dispatch<React.SetStateAction<string|string[]>>;
    isQueryBuilderVisible: boolean;
    setIsQueryBuilderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useAppContext must be used within a StateProvider');
    }
    return context;
};

interface StateProviderProps {
    children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [query, setQuery] = useState<RuleGroupType>({
        combinator: 'Root',
        rules: [
            { field: 'feature 1', operator: '>', value: 'threshold 1' },
            { field: 'feature 2', operator: '<', value: 'threshold 2' },
        ],
    });
    const [displayQuery, setDisplayQuery] = useState<RuleGroupType>({
        combinator: 'Root',
        rules: [
            { field: 'feature 1', operator: '>', value: 'threshold 1' },
            { field: 'feature 2', operator: '<', value: 'threshold 2' },
        ],
    });
    const [savedGroups, setSavedGroups] = useState<{ name: string; query: string }[]>([]);
    const [savedRules, setSavedRules] = useState<{ name: string; result:string, query: string }[]>([]);
    const [ruleResult, setRuleResult] = useState<string>('');
    const [displayResult, setDisplayResult] = useState<string>('');
    const [saveGroupModalVisible, setSaveGroupModalVisible] = useState<boolean>(false);
    const [saveRuleModalVisible, setSaveRuleModalVisible] = useState<boolean>(false);
    const [checkGroupModalVisible, setCheckGroupModalVisible] = useState<boolean>(false);
    const [checkRuleModalVisible, setCheckRuleModalVisible] = useState<boolean>(false);
    const [groupName, setGroupName] = useState<string>('');
    const [ruleName, setRuleName] = useState<string>('');
    const [operationResultName, setOperationResultName] = useState<{name:string,rule: any,id:string}[]>([]);
    const [originField, setOriginField] = useState<Field[]>([]);
    const [fields, setFields] = useState<Field[]>(originField);
    const [modules, setModules] = useState<{name: string ,logics:{id:string, logicName:string, logicQuery:RuleGroupType, operations:{id:string,left:string,mid:string,right:string,name:string}[]}[]}[]>([]);
    const [logic, setLogic] = useState<{id:string, logicName:string, logicQuery:RuleGroupType, operations:{id:string,left:string,mid:string,right:string,name:string}[]}>({id:'', logicName:'', logicQuery:{combinator: 'and', rules: [],}, operations:[]});
    const [activePanels, setActivePanels] = useState<string|string[]>([]);
    const [isQueryBuilderVisible, setIsQueryBuilderVisible] = useState(false);



    return (
        <StateContext.Provider value={{
            query,
            setQuery,
            displayQuery,
            setDisplayQuery,
            savedGroups,
            setSavedGroups,
            savedRules,
            setSavedRules,
            ruleResult,
            setRuleResult,
            displayResult,
            setDisplayResult,
            saveGroupModalVisible,
            setSaveGroupModalVisible,
            saveRuleModalVisible,
            setSaveRuleModalVisible,
            checkGroupModalVisible,
            setCheckGroupModalVisible,
            checkRuleModalVisible,
            setCheckRuleModalVisible,
            groupName,
            setGroupName,
            ruleName,
            setRuleName,
            operationResultName,
            setOperationResultName,
            originField,
            setOriginField,
            fields,
            setFields,
            modules,
            setModules,
            logic,
            setLogic,
            activePanels,
            setActivePanels,
            isQueryBuilderVisible,
            setIsQueryBuilderVisible,
        }}>
            {children}
        </StateContext.Provider>
    );
};
