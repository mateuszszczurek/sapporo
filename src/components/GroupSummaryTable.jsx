import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {groupSummary} from "../helpers/matches";

import '../css/agGridStyles.css';

const gridOptions = {
    suppressDragLeaveHidesColumns: true,
    suppressMovableColumns: true,
    suppressLoadingOverlay: true,
    suppressNoRowsOverlay: true,
    columnDefs: [
        {
            headerName: "Drużyna", field: "team", width: 500,
            cellClass: 'cell-wrap-text', autoHeight: true
        },
        {headerName: "Punkty", field: "matchPoints", width: 250, unSortIcon: true},
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
                {headerName: 'Remis.', field: "setsDraw"},
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

        const summary = groupSummary(matches, teams);

        const sorted = summary.sort(function sortSummary(firstTeam, secondTeam) {
                if (firstTeam.matchPoints > secondTeam.matchPoints) return -1;
                if (firstTeam.matchPoints < secondTeam.matchPoints) return 1;
                if (firstTeam.setsRatio > secondTeam.setsRatio) return -1;
                if (firstTeam.setsRatio < secondTeam.setsRatio) return 1;
                if (firstTeam.pointsRatio > secondTeam.pointsRatio) return -1;
                if (firstTeam.pointsRatio < secondTeam.pointsRatio) return 1;

                return 1;
            }
        );

        return <div className="ag-theme-balham">
            <div style={{overflow: 'auto'}}>
                <AgGridReact
                    onGridReady={this.onGridReady}
                    gridOptions={gridOptions}
                    rowData={sorted}
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