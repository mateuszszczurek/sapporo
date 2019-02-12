import 'rc-collapse/assets/index.css';
import Collapse, {Panel} from 'rc-collapse';
import React from 'react';
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import EditMatches from "./EditMatches";


function dupa() {
    alert('dupa')
}

const gridOptions = {
    suppressDragLeaveHidesColumns: true,
    suppressMovableColumns: true,
    enableSorting: true,
    columnDefs: [
        {headerName: "Drużyna", field: "team", width: 600, sortable: true},
        {
            groupId: 1,
            headerName: "Mecze",
            marryChildren: true,
            sortable: true,
            children: [
                {headerName: 'Rozegr.', field: "matchesPlayed"},
                {headerName: 'Wygr.', field: "matchesWon"},
                {headerName: 'Przegr.', field: "matchesLost"}
            ]
        },
        {
            groupId: 2,
            headerName: "Sety",
            suppressMovable: true,
            marryChildren: true,
            sortable: true,
            children: [
                {headerName: 'Wygr.', field: "setsWon"},
                {headerName: 'Przegr.', field: "setsLost"},
                {headerName: 'Stosunek', field: "setsRatio"}
            ]
        },
        {
            groupId: 3,
            headerName: "Punkty",
            suppressMovable: true,
            lockPosition: true,
            sortable: true,
            children: [
                {headerName: 'Wygr.', field: "sthWon"},
                {headerName: 'Przegr.', field: "sthLost"},
                {headerName: 'Stosunek', field: "sthRatio"}
            ]
        }
    ]
};

class TourneyDetails extends React.Component {

    constructor(props) {
        super(props);

        this.onGridReady = this.onGridReady.bind(this);
    }

    // TODO sortable by matches won, ratio,
    // TODO populate with data
    // TODO open and autosize to content
    // TODO extract table to another component (?)

    state = {
        accordion: true,
        activeKey: ['0'],
        rowData: [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000}
        ]
    };

    onChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    };

    onGridReady = (params) => {
        params.api.sizeColumnsToFit();
        params.api.onSortChanged(this.aaa)
    };

    render() {

        const activeKey = this.state.activeKey;

        return <Collapse
            accordion={false}
            onChange={this.onChange}
            activeKey={activeKey}
        >
            <Panel header='Tabela'>
                <div className="ag-theme-balham">
                    <div>
                        <AgGridReact onGridReady={this.onGridReady}
                                     gridOptions={gridOptions}
                                     rowData={this.state.rowData}
                                     onCellClicked={dupa}
                        />
                    </div>
                </div>
            </Panel>
            <Panel header='Mecze'>
            </Panel>
            <Panel header='Wprowadź mecz'>
                <div>
                    <EditMatches/>
                </div>
            </Panel>
        </Collapse>
    }
}

export default TourneyDetails;