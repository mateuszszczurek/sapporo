import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import Collapse, {Panel} from 'rc-collapse';
import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import EditMatches from "./AddMatch";
import Matches from "./MatchesDetails";
import GroupSummaryTable from "./GroupSummaryTable";

// TODO sortable by matches won, ratio,
// TODO populate with data
// TODO open and autosize to content
// TODO extract table to another component
// TODO no rows to show appears on table headers
// TODO on group change -> make table full width!

class TourneyDetails extends React.Component {

    state = {
        accordion: true,
        activeKey: ['0', '1', '2']
    };

    onChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    };

    render() {

        const {group} = this.props;

        const activeKey = this.state.activeKey;

        return <div>
            <Collapse
                accordion={false}
                onChange={this.onChange}
                activeKey={activeKey}
            >
                <Panel header='Tabela'>
                    <GroupSummaryTable matches={group.matches}
                                       teams={group.teams}
                    />
                </Panel>
                <Panel header='Mecze'>
                    <Matches matches={group.matches}/>
                </Panel>
                <Panel header='Wprowadź mecz'>
                    <div>
                        <EditMatches
                            group={this.props.group}
                            onMatchAdded={(firstTeam, secondTeam, sets) => this.props.onMatchAdded(group.groupLetter, firstTeam, secondTeam, sets)}
                        />
                    </div>
                </Panel>
            </Collapse>
        </div>
    }
}

TourneyDetails.propTypes = {

    group: PropTypes.object.isRequired,
    onMatchAdded: PropTypes.func

};

export default TourneyDetails;