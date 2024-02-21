import React, { createContext, useContext, useState, ReactNode } from 'react';
import {RuleGroupType} from "react-querybuilder";

interface StateContextType {
    query: RuleGroupType;
    setQuery: React.Dispatch<React.SetStateAction<RuleGroupType>>;
    displayQuery: RuleGroupType;
    setDisplayQuery: React.Dispatch<React.SetStateAction<RuleGroupType>>;
    savedGroups: { name: string; query: string }[];
    setSavedGroups: React.Dispatch<React.SetStateAction<{ name: string; query: string }[]>>;
    savedRules: { name: string; result: string; query: string }[];
    setSavedRules: React.Dispatch<React.SetStateAction<{ name: string; result: string, query: string }[]>>;
    result: string;
    setResult: React.Dispatch<React.SetStateAction<string>>;
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
        combinator: 'and',
        rules: [
            { field: 'feature place holder', operator: '>', value: 'threshold place holder' },
            { field: 'feature place holder', operator: '<', value: 'threshold place holder' },
        ],
    });
    const [displayQuery, setDisplayQuery] = useState<RuleGroupType>({
        combinator: 'and',
        rules: [
            { field: 'feature place holder', operator: '>', value: 'threshold place holder' },
            { field: 'feature place holder', operator: '<', value: 'threshold place holder' },
        ],
    });
    const [savedGroups, setSavedGroups] = useState<{ name: string; query: string }[]>([]);
    const [savedRules, setSavedRules] = useState<{ name: string; result:string, query: string }[]>([]);
    const [result, setResult] = useState<string>('');
    const [displayResult, setDisplayResult] = useState<string>('');
    const [saveGroupModalVisible, setSaveGroupModalVisible] = useState<boolean>(false);
    const [saveRuleModalVisible, setSaveRuleModalVisible] = useState<boolean>(false);
    const [checkGroupModalVisible, setCheckGroupModalVisible] = useState<boolean>(false);
    const [checkRuleModalVisible, setCheckRuleModalVisible] = useState<boolean>(false);
    const [groupName, setGroupName] = useState<string>('');
    const [ruleName, setRuleName] = useState<string>('');

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
            result,
            setResult,
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
        }}>
            {children}
        </StateContext.Provider>
    );
};
