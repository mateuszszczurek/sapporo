import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import Collapse, {Panel} from 'rc-collapse';
import React from 'react';
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import EditMatches from "./EditMatches";

// TODO sortable by matches won, ratio,
// TODO populate with data
// TODO open and autosize to content
// TODO extract table to another component
// TODO no rows to show appears on table headers
// TODO on group change -> make table full width!

function rowEntry(teamName) {
    return {
        team: teamName,
        matchesPlayed: 1,
        matchesWon: 2,
        matchesLost: 3,
        setsWon : 2,
        setsLost : 3,
        setsRatio : 0.3,
        pointsWon : 3,
        pointsLost : 4,
        pointsRatio : 0.4
    }
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
                {headerName: 'Wygr.', field: "pointsWon"},
                {headerName: 'Przegr.', field: "pointsLost"},
                {headerName: 'Stosunek', field: "pointsRatio"}
            ]
        }
    ]
};

class TourneyDetails extends React.Component {

    constructor(props) {
        super(props);

        this.onGridReady = this.onGridReady.bind(this);
    }

    state = {
        accordion: true,
        activeKey: ['0']
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

        const {group} = this.props;

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
                                     rowData={group.teams.map(it=>rowEntry(it))}
                        />
                    </div>
                </div>
            </Panel>
            <Panel header='Mecze'>
            </Panel>
            <Panel header='Wprowadź mecz'>
                <div>
                    <EditMatches group={this.props.group} onMatchAdded={this.props.onMatchAdded}/>
                </div>
            </Panel>
        </Collapse>
    }
}

TourneyDetails.propTypes = {

    group: PropTypes.object.isRequired,
    onMatchAdded : PropTypes.func

};

export default TourneyDetails;