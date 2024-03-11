import {useAppContext} from "../AppContent";
import {Input, message, Modal} from "antd";

const SaveGroup= () => {
    const {query,
        savedGroups,
        setSavedGroups,
        saveGroupModalVisible,
        setSaveGroupModalVisible,
        groupName,
        setGroupName}=useAppContext();


    const handleModalSaveOk = () => {
        if (!groupName) {
            message.error('Group Name cannot be empty');
            return;
        }

        const existingRuleIndex = savedGroups.findIndex(group => group.name === groupName);
        if (existingRuleIndex !== -1) {
            Modal.confirm({
                content: 'Name already exists, replace with the new one?',
                onOk() {
                    const newSavedGroups = [...savedGroups];
                    newSavedGroups[existingRuleIndex] = { name: groupName, query: JSON.stringify(query) };
                    setSavedGroups(newSavedGroups);
                    message.success('Group replaced');
                    setSaveGroupModalVisible(false);
                    setGroupName('');
                },
                onCancel() {
                    message.info('Replacement cancelled');
                }
            });
        } else {
            setSavedGroups([...savedGroups, { name: groupName, query: JSON.stringify(query) }]);
            message.success('Group Saved');
            setSaveGroupModalVisible(false);
            setGroupName('');
        }
    };


    const handleModalSaveCancel = () => {
        setSaveGroupModalVisible(false);
        setGroupName('');
    };

    return(
        <Modal
            title="Save Group"
            visible={saveGroupModalVisible}
            onOk={handleModalSaveOk}
            onCancel={handleModalSaveCancel}
        >
            <Input
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />
        </Modal>
    )
}

export default SaveGroup;