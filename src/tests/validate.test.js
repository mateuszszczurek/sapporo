import {validateSets} from "../helpers/validate";

describe('Matches summary', () => {

    it('should recognize if set result is missing for second team', () => {
        const sets = {
            1: {'first-team': 20, 'second-team': 30},
            2: {'first-team': 10, 'second-team': 15},
            3: {'second-team': 10}
        };

        const validationResults = validateSets(sets);

        expect(validationResults).toEqual({3: 'firstTeamResultMissing'})
    });

    it('should recognize if set result is missing for second team', () => {
        const sets = {
            1: {'first-team': 20, 'second-team': 30},
            2: {'first-team': 10},
            3: {'first-team': 10, 'second-team': 15}
        };

        const validationResults = validateSets(sets);

        expect(validationResults).toEqual({2: 'secondTeamResultMissing'})
    });

    it("should recognize if it's a draw", () => {
        const sets = {
            1: {'first-team': 20, 'second-team': 30},
            2: {'first-team': 10, 'second-team': 10},
            3: {'first-team': 10, 'second-team': 15}
        };

        const validationResults = validateSets(sets);

        expect(validationResults).toEqual({2: 'isADraw'})
    });

    it("should not yield any validation results if both set results are empty", () => {
        const sets = {
            1: {},
            2: {}
        };

        const validationResults = validateSets(sets);

        expect(validationResults).toEqual({})
    });

});