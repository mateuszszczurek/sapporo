export function matchSummary(match) {

    const sets = Object.keys(match.sets).map(key => match.sets[key]);

    const winningSetsFirstTeam = sets.filter(set => set['first-team'] > set['second-team']);
    const winningSetsSecondTeam = sets.filter(set => set['first-team'] < set['second-team']);

    const drawSets = sets.filter(set => set['first-team'] === set['second-team']).length;

    if (drawSets > 0) {
        throw new Error("Encountered sets with draw!")
    }

    const firstTeamTotalPoints = sets.map(set => set['first-team']).reduce((a, b) => a + b, 0);
    const secondTeamTotalPoints = sets.map(set => set['second-team']).reduce((a, b) => a + b, 0);

    const firstTeamSetsWon = winningSetsFirstTeam.length;
    const secondTeamSetsWon = winningSetsSecondTeam.length;

    function matchResult() {
        if (firstTeamSetsWon === secondTeamSetsWon) {
            return {draw: true}
        } else if (firstTeamSetsWon > secondTeamSetsWon) {
            return {winner: match.firstTeam, looser: match.secondTeam};
        } else {
            return {winner: match.secondTeam, looser: match.firstTeam}
        }
    }

    const result = matchResult();

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
        ...result
    }

}

function safeRatio(divisor, dividend) {
    return divisor === 0 ? null : (dividend) / (divisor);
}

function setsSummary(team, matches) {

    const sumOfSets = matches.map(it => it.sets.length).reduce((sum, value) => sum + value, 0);

    const setsWon = matches.map(it => it.firstTeamName === team ? it.firstTeamSetsWon : it.secondTeamSetsWon);

    const pointsWon = matches
        .map(it => it.firstTeamName === team ? it.firstTeamTotalPoints : it.secondTeamTotalPoints)
        .reduce((a, b) => a + b, 0);

    const pointsLost = matches
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

    return teams.map(team => {

        const matchesPlayed = matches
            .filter(match => match.firstTeam === team || match.secondTeam === team)
            .map(match => matchSummary(match));

        const wins = matchesPlayed.filter(match => match.winner === team).length;
        const looses = matchesPlayed.filter(match => match.looser === team).length;
        const draws = matchesPlayed.filter(match => match.draw === true).length;

        const points = (wins * 2) + (draws * 1);

        const summary = setsSummary(team, matchesPlayed);

        return {
            team: team,
            matchPoints: points,
            matchesPlayed: matchesPlayed.length,
            matchesWon: wins,
            matchesLost: looses,
            matchesDraw: draws,
            setsWon: summary.setsWon,
            setsLost: summary.setsLost,
            setsRatio: summary.setsRatio,
            pointsWon: summary.pointsWon,
            pointsLost: summary.pointsLost,
            pointsRatio: summary.pointsRatio
        };
    });
}

export function resultsSort(summary) {

    return summary.sort(function sortSummary(firstTeam, secondTeam) {
            if (firstTeam.matchPoints > secondTeam.matchPoints) return -1;
            if (firstTeam.matchPoints < secondTeam.matchPoints) return 1;
            if (firstTeam.setsRatio > secondTeam.setsRatio) return -1;
            if (firstTeam.setsRatio < secondTeam.setsRatio) return 1;
            if (firstTeam.pointsRatio > secondTeam.pointsRatio) return -1;
            if (firstTeam.pointsRatio < secondTeam.pointsRatio) return 1;

            return 1;
        }
    );

}