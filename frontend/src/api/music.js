//TODO: separate backend url to make dynamic prod/dev
const MUSIC_BASE_URL = 'http://localhost:3000/music-api/v1/';

export const fetchSwimlanes = () => {
    const parameters =  new URLSearchParams({
        device_id: 'olivier',
    });
    return fetch(MUSIC_BASE_URL + 'swimlane?' + parameters)
};
