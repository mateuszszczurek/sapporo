import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/es/Col";
import {matchSummary} from "../helpers/matches";
import {FaTimes} from "react-icons/fa/index";

import '../css/icons.css'

class MatchesDetails extends React.Component {

    render() {

        const {matches, removeMatch} = this.props;

        return matches.map(match =>
            <ResultRow
                key={match.id}
                firstTeam={match.firstTeam}
                secondTeam={match.secondTeam}
                match={match}
                removeMatch={removeMatch}
            />
        )
    }

}

function ResultRow({firstTeam, secondTeam, match, removeMatch}) {

    const summary = matchSummary(match);

    return <Row>
        <Col md={4}>
            <div className={'text-center'}>{firstTeam} vs {secondTeam}</div>
        </Col>
        <Col md={1}>
            <div className={'text-center'}><b>{summary.firstTeamSetsWon} : {summary.secondTeamSetsWon}</b></div>
        </Col>
        <Col md={4}>
            <div className={'text-center'}>{setDetails(summary.sets)}</div>
        </Col>
        <Col md={3}>
            <div className={'float-right'}>
                <FaTimes style={{color: "#b21f2d"}} onClick={() => removeMatch(match.id)}/>
            </div>
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

    matches: PropTypes.array,
    removeMatch: PropTypes.func

};

MatchesDetails.defaultProps = {

    matches: [],
    removeMatch: () => {
    }

};

export default MatchesDetails;