import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/es/Col";
import {matchSummary} from "../helpers/matches";

class MatchesDetails extends React.Component {

    render() {

        const {matches} = this.props;

        return matches.map(match =>
            <ResultRow
                key={match.firstTeam + match.secondTeam}
                firstTeam={match.firstTeam}
                secondTeam={match.secondTeam}
                match={match}
            />
        )
    }

}

function ResultRow({firstTeam, secondTeam, match}) {

    const summary = matchSummary(match);

    return <Row>
        <Col md={6}>
            <div className={'text-center'}>{firstTeam} vs {secondTeam}</div>
        </Col>
        <Col md={1}>
            <div className={'text-center'}><b>{summary.firstTeamSetsWon} : {summary.secondTeamSetsWon}</b></div>
        </Col>
        <Col md={5}>
            <div className={'text-center'}>{setDetails(summary.sets)}</div>
        </Col>
    </Row>

}

function setDetails(sets) {

    if (!sets || sets.length === 0) {
        return;
    }

    const setSummary = sets.map(set => set['first-team'] + ':' + set['second-team']).join(', ');
    return '(' + setSummary + ')';
}

MatchesDetails.propTypes = {

    matches: PropTypes.array

};

MatchesDetails.defaultProps = {

    matches: []

};

export default MatchesDetails;