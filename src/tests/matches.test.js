import '../helpers/matches.js'
import {groupSummary} from "../helpers/matches";

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


});