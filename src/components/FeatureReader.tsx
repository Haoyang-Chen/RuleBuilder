import React from 'react';
import Papa from 'papaparse';
import {Input} from "antd";
import {Field} from "react-querybuilder";
import {useAppContext} from "../AppContent";

export const FeatureReader: React.FC = () => {
    const {
        setOriginField,
        setFields
    } = useAppContext();
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) {
            Papa.parse(file, {
                complete: (result) => {

                    const fields: Field[] = [];
                    const labels = result.data[0] as string[];
                    const descriptions = result.data[1] as string[];

                    labels.forEach((label: string, index: number) => {
                        const name = descriptions[index];
                        console.log(name);
                        console.log(label);
                        fields.push({ name: name,label: label});
                    });
                    setOriginField(fields);
                    setFields(fields);
                },
            });
        }
    };

    return (
        <>
            <Input type="file" accept=".csv" onInput={handleFileInputChange}/>
        </>
    );
};
