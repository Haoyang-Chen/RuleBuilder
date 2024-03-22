import {Button, message} from "antd";
import React from "react";
import {useAppContext} from "../../AppContent";

const SaveRuleButton = () => {
    const {
        query,
        ruleResult,
        setSaveRuleModalVisible,
        fields,
        setFields,
        logic,
        modules,
        setModules,
    }=useAppContext();
    function handleSaveRule() {
        const id = logic.id;
        let newModules = [...modules];
        let moduleIndex = null;
        let logicIndex = null;

        newModules.forEach((module, mIndex) => {
            module.logics.forEach((item, lIndex) => {
                if (item.id === id) {
                    moduleIndex = mIndex;
                    logicIndex = lIndex;
                    newModules[moduleIndex].logics[logicIndex].logicQuery = query;
                    newModules[moduleIndex].logics[logicIndex].logicName = ruleResult;
                    newModules[moduleIndex].logics[logicIndex].operations = logic.operations;
                }
            });
        });

        if (moduleIndex !== null && logicIndex !== null) {
            // if(addToFeature(fields, setFields, ruleResult)===-1){
            //     return;
            // }
            // let field= fields.find((field) => field.id === logic.id);
            // field.label=ruleResult;
            // setFields([...fields]);
            const newFields = fields.filter((field) => field.id !== logic.id);
            newFields.push({id: logic.id, label: ruleResult, name: fields.find((field) => field.id === logic.id)?.name || ''});
            setFields(newFields);

            setModules(newModules);
            message.success('Logic Saved');
        } else {
            console.error('Logic not found');
        }
        setSaveRuleModalVisible(false);
    }

    return (
        <Button onClick={handleSaveRule} style={{backgroundColor: '#EBF5FB'}}>Save Logic</Button>
    );
}

export default SaveRuleButton;