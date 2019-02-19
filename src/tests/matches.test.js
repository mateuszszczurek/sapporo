import '../helpers/matches.js'
import {groupSummary, resultsSort} from "../helpers/matches";

describe('Matches summary', () => {

    const groupA = {
        "matches": [
            {
                "firstTeam": "Team A",
                "secondTeam": "Team B",
                "sets": {
                    "1": {"first-team": 10, "second-team": 20},
                    "2": {"first-team": 15, "second-team": 22},
                },
                "id": "809acfd0-e7d0-4c9f-b218-a5f66d469c59"
            }]
    };

    it('should properly create summary for two teams', () => {
        const summary = groupSummary(groupA.matches, ["Team A", "Team B"]);

        expect(summary.length).toBe(2);
    });

    it('should create summary for team A', () => {
        const summary = groupSummary(groupA.matches, ['Team A', 'Team B']);

        expect(summary[0]).toEqual({
            team: 'Team A',
            matchPoints: 0,
            matchesPlayed: 1,
            matchesWon: 0,
            matchesLost: 1,
            matchesDraw: 0,
            setsWon: 0,
            setsLost: 2,
            setsRatio: 0,
            pointsWon: 25,
            pointsLost: 42,
            pointsRatio: 0.5952380952380952
        });

        expect(summary[1]).toEqual({
            team: 'Team B',
            matchPoints: 2,
            matchesPlayed: 1,
            matchesWon: 1,
            matchesLost: 0,
            matchesDraw: 0,
            setsWon: 2,
            setsLost: 0,
            setsRatio: null,
            pointsWon: 42,
            pointsLost: 25,
            pointsRatio: 1.68
        })
    });

    it('should create summary for matches with draws', () => {
        const input = {
            "matches": [{
                "firstTeam": "Team A",
                "secondTeam": "Team B",
                "sets": {
                    "1": {"first-team": 10, "second-team": 20},
                    "2": {"first-team": 20, "second-team": 10},
                }
            }]
        };

        const summary = groupSummary(input.matches, ['Team A', 'Team B']);

        const expected = {
            matchPoints: 1,
            matchesPlayed: 1,
            matchesWon: 0,
            matchesLost: 0,
            matchesDraw: 1,
            setsWon: 1,
            setsLost: 1,
            setsRatio: 1,
            pointsWon: 30,
            pointsLost: 30,
            pointsRatio: 1
        };

        expect(summary[0]).toEqual({...expected, team: 'Team A'});
        expect(summary[1]).toEqual({...expected, team: 'Team B'});
    });

    it('should create summary for matches with draws', () => {
        const input = {
            "matches": [{
                "firstTeam": "Team A",
                "secondTeam": "Team B",
                "sets": {
                    "1": {"first-team": 10, "second-team": 20},
                    "2": {"first-team": 20, "second-team": 10},
                }
            }]
        };

        const summary = groupSummary(input.matches, ['Team A', 'Team B']);

        const expected = {
            matchPoints: 1,
            matchesPlayed: 1,
            matchesWon: 0,
            matchesLost: 0,
            matchesDraw: 1,
            setsWon: 1,
            setsLost: 1,
            setsRatio: 1,
            pointsWon: 30,
            pointsLost: 30,
            pointsRatio: 1
        };

        expect(summary[0]).toEqual({...expected, team: 'Team A'});
        expect(summary[1]).toEqual({...expected, team: 'Team B'});
    });

    it('should throw error if sets with equal amount of points are encountered', () => {

        const input = {
            "matches": [{
                "firstTeam": "Team A",
                "secondTeam": "Team B",
                "sets": {
                    "1": {"first-team": 10, "second-team": 10}
                }
            }]
        };

        expect(() => groupSummary(input.matches, ['Team A', 'Team B'])).toThrow(new Error("Encountered sets with draw!"));
    });

    it('should return no sets ratio when team was only winning', () => {
        const input = {
            "matches": [{
                "firstTeam": "Team A",
                "secondTeam": "Team B",
                "sets": {
                    "1": {"first-team": 5, "second-team": 21},
                    "2": {"first-team": 6, "second-team": 21},
                }
            }]
        };

        const summary = groupSummary(input.matches, ['Team A', 'Team B']);

        const expected = {
            setsRatio: null,
            team: 'Team B'
        };

        expect(summary[1]).toEqual(jasmine.objectContaining(expected));
    });

    it('should sort by match points first', () => {

        const teamWithMorePoints = {
            team : 'A',
            matchPoints: 4,
            setsRatio: 1,
            pointsRatio: 1
        };

        const teamWithLessPoints = {
            team : 'B',
            matchPoints: 2,
            setsRatio: 3,
            pointsRatio: 3
        };

        const firstPermutation = resultsSort([teamWithMorePoints, teamWithLessPoints]);

        expect(firstPermutation[0].team).toBe('A');
        expect(firstPermutation[1].team).toBe('B');

        const secondPermutation = resultsSort([teamWithMorePoints, teamWithLessPoints]);

        expect(secondPermutation[0].team).toBe('A');
        expect(secondPermutation[1].team).toBe('B');
    });

    it('when teams have equal amount of points, sets ratio is taken into account, favoring higher values', () => {

        const teamA = {
            team : 'A',
            matchPoints: 4,
            setsRatio: 1,
            pointsRatio: 1
        };

        const teamB = {
            team : 'B',
            matchPoints: 4,
            setsRatio: 3,
            pointsRatio: 3
        };

        const firstPermutation = resultsSort([teamA, teamB]);

        expect(firstPermutation[0].team).toBe('B');
        expect(firstPermutation[1].team).toBe('A');

        const secondPermutation = resultsSort([teamA, teamB]);

        expect(secondPermutation[0].team).toBe('B');
        expect(secondPermutation[1].team).toBe('A');
    });

    it('when teams have equal amount of points and sets ratio, small points ratio is taken into account', () => {

        const teamA = {
            team : 'A',
            matchPoints: 4,
            setsRatio: 1,
            pointsRatio: 0.3
        };

        const teamB = {
            team : 'B',
            matchPoints: 4,
            setsRatio: 1,
            pointsRatio: 0.5
        };

        const firstPermutation = resultsSort([teamA, teamB]);

        expect(firstPermutation[0].team).toBe('B');
        expect(firstPermutation[1].team).toBe('A');

        const secondPermutation = resultsSort([teamA, teamB]);

        expect(secondPermutation[0].team).toBe('B');
        expect(secondPermutation[1].team).toBe('A');
    });

    it('when sets ratio is undefined and taken into account, it should have higher value', () => {

        const teamA = {
            team : 'A',
            matchPoints: 4,
            setsRatio: null,
            pointsRatio: 0.3
        };

        const teamB = {
            team : 'B',
            matchPoints: 4,
            setsRatio: 100,
            pointsRatio: 0.5
        };

        const results = resultsSort([teamB, teamA]);

        expect(results[0].team).toBe('A');
        expect(results[1].team).toBe('B');
    });

    it('when sets ratio is undefined for both teams and taken into account, we should still take points ratio into account', () => {

        const teamA = {
            team : 'A',
            matchPoints: 4,
            setsRatio: null,
            pointsRatio: 0.3
        };

        const teamB = {
            team : 'B',
            matchPoints: 4,
            setsRatio: null,
            pointsRatio: 0.5
        };

        const results = resultsSort([teamA, teamB]);

        expect(results[0].team).toBe('B');
        expect(results[1].team).toBe('A');
    });


    it('can sort three teams according to rules', () => {

        const teamA = {
            team : 'A',
            matchPoints: 10,
            setsRatio: 1,
            pointsRatio: 0.3
        };

        const teamB = {
            team : 'B',
            matchPoints: 5,
            setsRatio: 1,
            pointsRatio: 0.5
        };

        const teamC = {
            team : 'C',
            matchPoints: 5,
            setsRatio: 3,
            pointsRatio: 0.5
        };


        const sortedTeams = resultsSort([teamB, teamC, teamA]);

        expect(sortedTeams[0].team).toBe('A');
        expect(sortedTeams[1].team).toBe('C');
        expect(sortedTeams[2].team).toBe('B');

    });


});