export function matchSummary(match) {

    const sets = Object.keys(match.sets).map(key => match.sets[key]);

    const setsExcludingDraws = sets.filter(set => set['first-team'] !== set['second-team']);
    const winningSets = setsExcludingDraws.filter(set => set['first-team'] > set['second-team']);

    const firstTeamTotalPoints = setsExcludingDraws.map(set => set['first-team']).reduce((a, b) => a + b, 0);
    const secondTeamTotalPoints = setsExcludingDraws.map(set => set['second-team']).reduce((a, b) => a + b, 0);

    const firstTeamSetsWon = winningSets.length;
    const secondTeamSetsWon = setsExcludingDraws.length - firstTeamSetsWon;

    return {
        firstTeamTotalPoints: firstTeamTotalPoints,
        secondTeamTotalPoints: secondTeamTotalPoints,
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

function safeRatio(divisor, dividend) {
    return divisor === 0 ? null : (dividend) / (divisor);
}

function setsSummary(team, matches) {

    const summaries = matches.map(match => matchSummary(match));
    const sumOfSets = summaries.map(it => it.sets.length).reduce((sum, value) => sum + value, 0);

    const setsWon = summaries.map(it => it.firstTeamName === team ? it.firstTeamSetsWon : it.secondTeamSetsWon);

    const pointsWon = summaries
        .map(it => it.firstTeamName === team ? it.firstTeamTotalPoints : it.secondTeamTotalPoints)
        .reduce((a, b) => a + b, 0);

    const pointsLost = summaries
        .map(it => it.firstTeamName === team ? it.secondTeamTotalPoints : it.firstTeamTotalPoints)
        .reduce((a, b) => a + b, 0);

    const amountOfSetsWon = setsWon.reduce((a, b) => a + b, 0);

    const setsLost = sumOfSets - amountOfSetsWon;

    const setsRatio = safeRatio(setsLost, amountOfSetsWon);

    return {
        teamName: team,
        setsWon: amountOfSetsWon,
        setsLost: setsLost,
        setsRatio: setsRatio,
        pointsWon: pointsWon,
        pointsLost: pointsLost,
        pointsRatio: safeRatio(pointsLost, pointsWon)
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
            pointsWon: summary.pointsWon,
            pointsLost: summary.pointsLost,
            pointsRatio: summary.pointsRatio
        }

    });

}