import React from 'react';
import {Button, List, Tooltip} from 'antd';
import {useAppContext} from "../AppContent";


const SavedFeatureList= () => {
    const {fields,setFields,originField}=useAppContext();
    //the added fields refer to the features that are added apart from the original features = fields-originfield
    const addedFields=fields.filter((field)=>!originField.includes(field));


    const handleDeleteField = (index: number) => {
        const newFields = fields.filter((field, i) => i !== index+fields.length-addedFields.length);
        setFields(newFields);
    };


    return (
        <>
            <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px', backgroundColor: '#FDEBD0' }}>
                <h3>Saved Feature</h3>
                <List
                    dataSource={addedFields}
                    locale={{ emptyText: 'Empty' }}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{ display: 'flex', alignItems: 'center'}}
                            actions={[
                                <Button onClick={() => handleDeleteField(index)} style={{ margin: '0px' }}>x</Button>
                            ]}
                        >
                            <Tooltip title={item.name} placement={"left"}>
                                {item.label}
                            </Tooltip>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
};

export default SavedFeatureList;
