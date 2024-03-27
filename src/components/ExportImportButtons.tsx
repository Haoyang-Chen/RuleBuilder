import React from 'react';
import { Button } from 'antd';
import { useAppContext } from '../AppContent';

export const ExportButton = () => {
    const { query, savedGroups, savedRules, operationResultName, ruleResult, fields ,logic,modules} = useAppContext();

    const exportState = async () => {
        const state = { query, savedGroups, savedRules, operationResultName, ruleResult, fields, logic,modules};
        const data = JSON.stringify(state);

        // Create a Blob from the JSON data
        const blob = new Blob([data], { type: 'application/json' });

        // Create a temporary anchor element
        const a = document.createElement('a');

        // Set the download attribute and href
        a.download = 'state.json';
        a.href = URL.createObjectURL(blob);

        // Click the anchor to trigger the download
        a.click();

        // Cleanup
        URL.revokeObjectURL(a.href);
    };

    return (
        <Button onClick={exportState}>Export</Button>
    );
};

export const ImportButton = () => {
    const { setQuery, setSavedGroups, setSavedRules, setOperationResultName, setRuleResult, setFields,setLogic,setModules } = useAppContext();

    const importState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result;
                if (content) {
                    const data = JSON.parse(content.toString());
                    setQuery(data.query);
                    setSavedGroups(data.savedGroups);
                    setSavedRules(data.savedRules);
                    setOperationResultName(data.operationResultName);
                    setRuleResult(data.ruleResult);
                    setFields(data.fields);
                    setLogic(data.logic);
                    setModules(data.modules);
                }
            } catch (error) {
                console.error('Error parsing JSON file:', error);
            }
        };
        reader.readAsText(file);
    };

    const handleClick = () => {
        const inputElement = document.getElementById('fileInput');
        if (inputElement) {
            inputElement.click();
        }
    };

    return (
        <label className="custom-file-upload">
            <input id={'fileInput'} type="file" onChange={importState} accept=".json" style={{ display: 'none' }} />
            <Button className="custom-button" onClick={handleClick}>Import</Button>
        </label>
    );
};
