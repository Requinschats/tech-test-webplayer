//TODO: separate backend url to make dynamic prod/dev
const MUSIC_BASE_URL = 'http://localhost:3000/music-api/v1/';

export const fetchSwimlanes = () => {
    const parameters =  new URLSearchParams({device_id: 'olivier'});
    return fetch(MUSIC_BASE_URL + 'swimlane?' + parameters)
};

export const fetchChannels = (categoryId) => {
    const parameters =  new URLSearchParams({device_id: 'olivier'});
    return fetch(`${MUSIC_BASE_URL}swimlane/${categoryId}?${parameters}`).then(response => response.json())
};

export const fetchPlaylist = (channelId) => {
    return fetch(MUSIC_BASE_URL + 'playlist', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channel_id: channelId,
            codec: 'aac',
            device_id: 'olivier',
            format: 'mp4',
            quality: 'ultra',
            size: 5
        })
    }).then(response => response.json())
};

export const fetchTrack = (trackFullPath) => {
    const parameters =  new URLSearchParams({device_id: 'olivier'});
    const START_TOKEN = 'playlist/';
    const trackPath = trackFullPath.substr(trackFullPath.indexOf(START_TOKEN) + START_TOKEN.length, trackFullPath.length)
    return fetch(`${MUSIC_BASE_URL}playlist/${trackPath}?${parameters}`)
        .then(response => response.json())
        .catch(e => console.log(e))
};
