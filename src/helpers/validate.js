export function validateSets(sets) {

    const validationResults = {};

    Object.keys(sets).forEach(key => {
        const results = sets[key];

        if(!results['first-team'] && !results['second-team']) {
            return;
        }

        if(!results['first-team']) {
            validationResults[key] = 'firstTeamResultMissing'
        }

        if(!results['second-team']) {
            validationResults[key] = 'secondTeamResultMissing'
        }

        if(results['first-team'] === results['second-team']) {
            validationResults[key] = 'isADraw'
        }
    });

    return validationResults;

}