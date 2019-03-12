export const getData = (experience, location, skill) => ({
    type: 'FETCH_DATA',
    payload: {
        experience,
        location,
        skill
    }
});