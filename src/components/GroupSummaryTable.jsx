import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {groupSummary, resultsSort} from "../helpers/matches";

import '../css/agGridStyles.css';

const gridOptions = {
    suppressDragLeaveHidesColumns: true,
    suppressMovableColumns: true,
    suppressLoadingOverlay: true,
    suppressNoRowsOverlay: true,
    columnDefs: [
        {
            headerName: "Drużyna", field: "team", width: 350,
            cellClass: 'cell-wrap-text', autoHeight: true
        },
        {headerName: "Punkty", field: "matchPoints", width: 200},
        {
            groupId: 1,
            headerName: "Mecze",
            marryChildren: true,
            children: [
                {headerName: 'Rozegr.', field: "matchesPlayed"},
                {headerName: 'Wygr.', field: "matchesWon"},
                {headerName: 'Przegr.', field: "matchesLost"},
                {headerName: 'Remis', field: "matchesDraw"}
            ]
        },
        {
            groupId: 2,
            headerName: "Sety",
            suppressMovable: true,
            marryChildren: true,
            children: [
                {headerName: 'Wygr.', field: "setsWon"},
                {headerName: 'Przegr.', field: "setsLost"},
                {headerName: 'Stos.', field: "setsRatio", valueFormatter: twoDigits}
            ]
        },
        {
            groupId: 3,
            headerName: "Punkty",
            suppressMovable: true,
            lockPosition: true,
            children: [
                {headerName: 'Wygr.', field: "pointsWon"},
                {headerName: 'Przegr.', field: "pointsLost"},
                {headerName: 'Stos.', field: "pointsRatio", valueFormatter: twoDigits}
            ]
        }
    ]
};

function twoDigits(target) {
    if (target.value !== 0 && !target.value) {
        return '-';
    }

    return parseFloat(target.value).toFixed(2);
}

class GroupSummaryTable extends React.Component {

    constructor(props) {
        super(props);

        this.onGridReady = this.onGridReady.bind(this);
    }

    onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };

    render() {

        const {matches, teams} = this.props;

        const summary = resultsSort(groupSummary(matches, teams));

        return <div className="ag-theme-balham">
            <div style={{overflow: 'auto'}}>
                <AgGridReact
                    onGridReady={this.onGridReady}
                    gridOptions={gridOptions}
                    rowData={summary}
                />
            </div>
        </div>
    }

}

GroupSummaryTable.propTypes = {

    teams: PropTypes.array,
    matches: PropTypes.array

};

export default GroupSummaryTable;