import React from 'react';
import { useAppContext } from "../AppContent";
import { Input, Modal, message } from "antd";

const SaveRule = () => {
    const {
        query,
        savedRules,
        setSavedRules,
        saveRuleModalVisible,
        setSaveRuleModalVisible,
        ruleName,
        setRuleName,
        ruleResult
    } = useAppContext();

    const handleModalSaveOk = () => {
        if (!ruleName) {
            message.error('Rule Name cannot be empty');
            return;
        }

        const existingRuleIndex = savedRules.findIndex(rule => rule.name === ruleName);
        if (existingRuleIndex !== -1) {
            Modal.confirm({
                content: 'Name already exists, replace with the new one?',
                onOk() {
                    const newSavedRules = [...savedRules];
                    newSavedRules[existingRuleIndex] = { name: ruleName, result: ruleResult, query: JSON.stringify(query) };
                    setSavedRules(newSavedRules);
                    message.success('Rule replaced');
                    setSaveRuleModalVisible(false);
                    setRuleName('');
                },
                onCancel() {
                    message.info('Replacement cancelled');
                }
            });
        } else {
            setSavedRules([...savedRules, { name: ruleName, result: ruleResult, query: JSON.stringify(query) }]);
            message.success('Rule Saved');
            setSaveRuleModalVisible(false);
            setRuleName('');
        }
    };

    const handleModalSaveCancel = () => {
        setSaveRuleModalVisible(false);
        setRuleName('');
    };

    return (
        <Modal
            title="Save Rule"
            visible={saveRuleModalVisible}
            onOk={handleModalSaveOk}
            onCancel={handleModalSaveCancel}
        >
            <Input
                placeholder="Rule Name"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
            />
        </Modal>
    )
};

export default SaveRule;
