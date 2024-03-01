import {QueryBuilderDnD} from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import type {
    ActionWithRulesAndAddersProps,
    CombinatorSelectorProps,
    OptionList
} from 'react-querybuilder';
import {QueryBuilder, ValueSelector, Option} from 'react-querybuilder';
import {Button, Input} from 'antd';
import 'react-querybuilder/dist/query-builder.css';
import {QueryBuilderAntD,AntDValueSelector} from '@react-querybuilder/antd';
import {useAppContext} from '../AppContent';
import {ExportButton, ImportButton} from "./ExportImportButtons";
import {fields} from "./Fields";

const CustomQueryBuilder = () => {
    const {
        query,
        setQuery,
        result,
        setResult,
        setSaveGroupModalVisible,
        setSaveRuleModalVisible}=useAppContext();



    const AddRuleButtons = (props: ActionWithRulesAndAddersProps) => {
        const handleSaveGroup = () => {
            setSaveGroupModalVisible(true);
        };

        return(
            <>
                <Button onClick={handleSaveGroup}>Save Group</Button>
                <Button onClick={(e) => props.handleOnClick(e)}>+Rule</Button>
            </>
        );
    };

    const SaveRuleButton = () => {
        function handleSaveRule() {
            setSaveRuleModalVisible(true);
        }

        return (
            <Button onClick={handleSaveRule}>Save Rule</Button>
        );
    }

    const CombinatorSelector = (props: CombinatorSelectorProps) => {
        const options: OptionList = [
            { name: 'And', label: 'AND' },
            { name: 'Or', label: 'OR' },
            { name:'GOR2', label:'GOR2'}
        ];

        return (
            <AntDValueSelector
                {...props}
                options={options}
                value={props.value}
                handleOnChange={props.handleOnChange}
            />
        );
    };



    return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '20px' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'0px'}}>
                        <h3>RuleBuilder</h3>
                        <SaveRuleButton />
                        <ExportButton />
                        <ImportButton />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'0px', marginBottom: '10px'}}>
                        <div style={{ whiteSpace: 'nowrap' }}>Result Name:</div>
                        <Input
                            placeholder="Result Name"
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            style={{ marginBottom: '10px' ,marginTop: '10px', width:'378px'}}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' ,marginTop: '10px', width:'900px'}}>
                        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
                            <QueryBuilderAntD>
                                <QueryBuilder
                                    fields={fields}
                                    query={query}
                                    onQueryChange={(q: any) => setQuery(q)}
                                    showNotToggle
                                    addRuleToNewGroups
                                    controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                                    controlElements={{
                                        addRuleAction: AddRuleButtons,
                                        combinatorSelector: CombinatorSelector
                                    }}
                                />
                            </QueryBuilderAntD>
                        </QueryBuilderDnD>
                    </div>
                </div>
            </div>
    );
};

export default CustomQueryBuilder;
