import React from 'react';
import { useAppContext } from "../AppContent";
import { Input, Modal, message } from "antd";

const SaveRule = () => {
    const {
        query,
        saveRuleModalVisible,
        setSaveRuleModalVisible,
        ruleName,
        setRuleName,
        ruleResult,
        modules,
        setModules,
        logic,
        setLogic,
    } = useAppContext();

    const handleModalSaveOk = () => {
        if (!ruleName) {
            message.error('Logic Name cannot be empty');
            return;
        }

        // const existingRuleIndex = savedRules.findIndex(rule => rule.name === ruleName);
        // if (existingRuleIndex !== -1) {
        //     Modal.confirm({
        //         content: 'Name already exists, replace with the new one?',
        //         onOk() {
        //             const newSavedRules = [...savedRules];
        //             newSavedRules[existingRuleIndex] = { name: ruleName, result: ruleResult, query: JSON.stringify(query) };
        //             setSavedRules(newSavedRules);
        //             message.success('Logic replaced');
        //             setSaveRuleModalVisible(false);
        //             setRuleName('');
        //         },
        //         onCancel() {
        //             message.info('Replacement cancelled');
        //         }
        //     });
        // } else {
        //     setSavedRules([...savedRules, { name: ruleName, result: ruleResult, query: JSON.stringify(query) }]);
        //     message.success('Logic Saved');
        //     setSaveRuleModalVisible(false);
        //     setRuleName('');
        // }
        const id=logic.id;
        console.log('id',id);
        modules.forEach((module)=>{
            module.logics.forEach((item)=>{
                if(item.id===id){
                    item.logicName=ruleName;
                    item.logicQuery=JSON.stringify(query);
                }
            });
        });
        message.success('Logic Saved');
        setSaveRuleModalVisible(false);
        setRuleName('');
    };

    const handleModalSaveCancel = () => {
        setSaveRuleModalVisible(false);
        setRuleName('');
    };

    return (
        <Modal
            title="Save Logic"
            visible={saveRuleModalVisible}
            onOk={handleModalSaveOk}
            onCancel={handleModalSaveCancel}
        >
            <Input
                placeholder="Logic Name"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
            />
        </Modal>
    )
};

export default SaveRule;
