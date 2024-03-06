import React from 'react';
import { StateProvider } from './AppContent';
import SavedGroupList from './components/SavedGroupList';
import SavedRuleList from "./components/SavedRuleList";
import SaveGroup from './components/SaveGroup';
import CustomQueryBuilder from './components/QueryBuilder';
import SaveRule from "./components/SaveRule";
import Debugger from "./components/Debugger";
import SavedFeatureList from "./components/SavedFeatureList";

const App: React.FC = () => {
    return (
        <StateProvider>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
                <div style={{ marginRight: '20px' }}>
                    <SavedFeatureList />
                </div>
                <div style={{ marginRight: '20px' }}>
                    <SavedRuleList />
                </div>
                <div style={{ marginRight: '20px' }}>
                    <SavedGroupList />
                </div>
                <div style={{ marginRight: '20px' }}>
                    <CustomQueryBuilder />
                </div>
                <SaveGroup />
                <SaveRule />
            </div>
            <Debugger />
            <div style={{height:'40px'}}></div>
        </StateProvider>
    );
};

export default App;
