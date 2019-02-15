export function matchSummary(match) {

    const sets = Object.keys(match.sets).map(key => match.sets[key]);

    const setsExcludingDraws = sets.filter(set => set['first-team'] !== set['second-team']);
    const firstTeamSetsWon = setsExcludingDraws.filter(set => set['first-team'] > set['second-team']).length;
    const secondTeamSetsWon = setsExcludingDraws.length - firstTeamSetsWon;

    return {
        firstTeamName: match.firstTeam,
        secondTeamName: match.secondTeam,
        firstTeamSetsWon: firstTeamSetsWon,
        secondTeamSetsWon: secondTeamSetsWon,
        firstTeamSetsLost: secondTeamSetsWon,
        secondTeamSetsLost: firstTeamSetsWon,
        sets: sets,
        winner: firstTeamSetsWon > secondTeamSetsWon ? match.firstTeam : match.secondTeam,
        looser: firstTeamSetsWon < secondTeamSetsWon ? match.firstTeam : match.secondTeam
    }

}

function setsSummary(team, matches) {

    const summaries = matches.map(match => matchSummary(match));
    const sumOfSets = summaries.map(it => it.sets.length).reduce((sum, value) => sum + value, 0);
    const setsWon = summaries.map(it => it.firstTeamName === team ? it.firstTeamSetsWon : it.secondTeamSetsWon).reduce((a, b) => a + b, 0);

    const setsLost = sumOfSets - setsWon;

    // TODO sets ratio - rounding?

    return {
        teamName: team,
        setsWon: setsWon,
        setsLost: setsLost,
        setsRatio: setsWon / setsLost
    }

}

export function groupSummary(matches, teams) {

    return teams.map(teamName => {
        const matchesPlayed = matches.filter(match => match.firstTeam === teamName || match.secondTeam === teamName);

        const wonMatches = matches.map(match => matchSummary(match)).filter(summary => summary.winner === teamName);
        const lostMatches = matches.map(match => matchSummary(match)).filter(summary => summary.looser === teamName);

        const summary = setsSummary(teamName, matchesPlayed);

        return {
            team: teamName,
            matchesPlayed: matchesPlayed.length,
            matchesWon: wonMatches.length,
            matchesLost: lostMatches.length,
            setsWon: summary.setsWon,
            setsLost: summary.setsLost,
            setsRatio: summary.setsRatio,
            pointsWon: null,
            pointsLost: null,
            pointsRatio: null
        }

    });

}