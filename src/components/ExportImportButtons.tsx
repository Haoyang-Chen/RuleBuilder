import React, {ChangeEvent} from 'react';
import { useAppContext } from '../AppContent';
import {Button, Input} from 'antd';

export const ExportButton = () => {
    const {query,
        savedGroups,
        savedRules,
        operationResultName}=useAppContext()
    const exportState = () => {
        const state={query,savedGroups, savedRules, operationResultName};
        const data = JSON.stringify(state);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'state.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (
            <Button onClick={exportState}>Export</Button>
    );
};

export const ImportButton = () => {
    const {
        setQuery,
        setSavedGroups,
        setSavedRules,
        setOperationResultName}=useAppContext()

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
