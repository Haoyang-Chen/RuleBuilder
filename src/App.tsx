import React from 'react';
import { StateProvider } from './AppContent';
import SavedGroupList from './components/SavedGroupList';
import SavedRuleList from "./components/SavedRuleList";
import SaveGroup from './components/SaveGroup';
import CustomQueryBuilder from './components/QueryBuilder';
import SaveRule from "./components/SaveRule";

const App: React.FC = () => {
    return (
        <StateProvider>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
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
        </StateProvider>
    );
};

export default App;
