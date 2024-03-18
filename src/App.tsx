import React, {useState} from 'react';
import {StateProvider, useAppContext} from './AppContent';
import SavedGroupList from './components/SavedGroupList';
import SavedRuleList from "./components/SavedRuleList";
import SaveGroup from './components/SaveGroup';
import CustomQueryBuilder from './components/QueryBuilder';
import SaveRule from "./components/SaveRule";
import Debugger from "./components/Debugger";
import SavedFeatureList from "./components/SavedFeatureList";
import {ExportButton, ImportButton} from "./components/ExportImportButtons";
import ClearRuleButton from "./components/ClearRuleButton";
import {FeatureReader} from "./components/FeatureReader";
import ClipBoard from "./components/ClipBoard";

const App: React.FC = () => {
    return (
        <StateProvider>
            <div style={{position: 'relative'}}>
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
                    <div style={{marginRight: '20px'}}>
                        <SavedRuleList/>
                    </div>
                    {/*<div style={{marginRight: '20px'}}>*/}
                    {/*    <SavedFeatureList/>*/}
                    {/*</div>*/}
                    {/*<div style={{marginRight: '20px'}}>*/}
                    {/*    <SavedGroupList/>*/}
                    {/*</div>*/}

                    <div style={{marginRight: '20px'}}>
                        <CustomQueryBuilder/>
                    </div>

                    <div style={{marginRight: '20px'}}>
                        <ClipBoard/>
                    </div>
                </div>
                <div style={{display: 'flex', position: 'absolute', top: '20px', right: '200px'}}>
                <div style={{marginRight: '20px'}}>
                        <FeatureReader/>
                    </div>
                    <div style={{marginRight: '20px'}}>
                        <ExportButton/>
                    </div>
                    <div style={{marginRight: '20px'}}>
                        <ImportButton/>
                    </div>
                    <div style={{marginRight: '20px'}}>
                        <ClearRuleButton/>
                    </div>
                </div>
                <Debugger/>
            </div>
            <SaveGroup/>
            {/*<SaveRule/>*/}
        </StateProvider>
    );
};

export default App;
