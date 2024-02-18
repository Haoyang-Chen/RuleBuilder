import {useAppContext} from "../AppContent";
import {Input, Modal} from "antd";

const SaveGroup= () => {
    const {query,
        savedGroups,
        setSavedGroups,
        saveGroupModalVisible,
        setSaveGroupModalVisible,
        groupName,
        setGroupName}=useAppContext();

    const handleModalSaveOk = () => {
        setSavedGroups([...savedGroups, { name: groupName, query: JSON.stringify(query) }]);
        setSaveGroupModalVisible(false);
        setGroupName('');
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