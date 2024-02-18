import {useAppContext} from "../AppContent";
import {Input, Modal} from "antd";

const SaveRule= () => {
    const {query,
        savedRules,
        setSavedRules,
        saveRuleModalVisible,
        setSaveRuleModalVisible,
        ruleName,
        setRuleName,
        result}=useAppContext();

    const handleModalSaveOk = () => {
        setSavedRules([...savedRules, { name: ruleName,result:result, query: JSON.stringify(query) }]);
        setSaveRuleModalVisible(false);
        setRuleName('');
    };

    const handleModalSaveCancel = () => {
        setSaveRuleModalVisible(false);
        setRuleName('');
    };

    return(
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
}

export default SaveRule;