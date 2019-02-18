import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {groupSummary} from "../helpers/matches";

const gridOptions = {
    suppressDragLeaveHidesColumns: true,
    suppressMovableColumns: true,
    enableSorting: true,
    suppressLoadingOverlay: true,
    suppressNoRowsOverlay: true,
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
                {headerName: 'Stosunek', field: "setsRatio", valueFormatter: twoDigits}
            ]
        },
        {
            groupId: 3,
            headerName: "Punkty",
            suppressMovable: true,
            lockPosition: true,
            sortable: true,
            children: [
                {headerName: 'Wygr.', field: "pointsWon"},
                {headerName: 'Przegr.', field: "pointsLost"},
                {headerName: 'Stosunek', field: "pointsRatio", valueFormatter: twoDigits}
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

const exampleData = {

    matches: [
        {
            'firstTeam': 'A',
            'secondTeam': 'B',
            'sets': {
                1: {
                    'first-team': 10,
                    'second-team': 1
                },
                2: {
                    'first-team': 10,
                    'second-team': 1
                },
                3: {
                    'first-team': 10,
                    'second-team': 1
                },
                4: {
                    'first-team': 0,
                    'second-team': 1
                }
            }
        },
        {
            'firstTeam': 'B',
            'secondTeam': 'C',
            'sets': {
                1: {
                    'first-team': 12,
                    'second-team': 21
                },
                2: {
                    'first-team': 2,
                    'second-team': 21
                },
                3: {
                    'first-team': 12,
                    'second-team': 21
                }
            }
        },
        {
            'firstTeam': 'A',
            'secondTeam': 'C',
            'sets': {
                1: {
                    'first-team': 30,
                    'second-team': 21
                },
                2: {
                    'first-team': 30,
                    'second-team': 21
                },
                3: {
                    'first-team': 50,
                    'second-team': 21
                }
            }
        },
        {
            'firstTeam': 'D',
            'secondTeam': 'C',
            'sets': {
                1: {
                    'first-team': 30,
                    'second-team': 21
                },
                2: {
                    'first-team': 30,
                    'second-team': 21
                },
                3: {
                    'first-team': 50,
                    'second-team': 21
                },
                4: {
                    'first-team': 50,
                    'second-team': 21
                },
                5: {
                    'first-team': 50,
                    'second-team': 21
                }
            }
        },
        {
            'firstTeam': 'E',
            'secondTeam': 'A',
            'sets': {
                1: {
                    'first-team': 30,
                    'second-team': 50
                },
                2: {
                    'first-team': 30,
                    'second-team': 60
                },
                3: {
                    'first-team': 50,
                    'second-team': 100
                },
                4: {
                    'first-team': 50,
                    'second-team': 200
                },
                5: {
                    'first-team': 50,
                    'second-team': 210
                }
            }
        }
    ],
    teams:
        ['A', 'B', 'C', 'D', 'E', 'F']

    // A p:3 w:3 l:0
    // B p:2 w:0 l:2
    // C p:3 w:1 l:2
    // D p:1 w:1 l:0
    // E p:0 w:0 l:1
    // F p:0 w:0 l:0

};


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

        return <div className="ag-theme-balham">
            <div>
                <AgGridReact onGridReady={this.onGridReady}
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