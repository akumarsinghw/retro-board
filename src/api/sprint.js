const DEFAULT_GET = {
    method: 'GET',
    url: 'localhost:3000/sprint/types',
    headers: {Accept: '*/*', 'User-Agent': 'Thunder Client (https://www.thunderclient.com)'}
}
const DEFAULT_POST = {  
    method: 'POST',
    mode: "cors",
    headers: {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json'
    },
}

//  GET
export const GET_ALL_SPRINT = async () => {
    const sprintTypesResponse = await fetch("http://localhost:3000/sprint/comments");
    const temp = await sprintTypesResponse.json();
    return temp.data;

}
export const GET_SPRINT_TYPE = async () => {
    const sprintTypesResponse = await fetch("http://localhost:3000/sprint/types");
    const temp = await sprintTypesResponse.json();
    return temp.data;

}
export const GET_ACTIVE_SPRINT = async () => {
    const currentSprintResponse = await fetch("http://localhost:3000/sprint/current");
    const temp = await currentSprintResponse.json();
    return temp.data;
}

// POST
export const POST_COMMENT = async ({id, payload = {}}) => {
    const currentSprintResponse = await fetch(`http://localhost:3000/comment/${id}`, {
        ...DEFAULT_POST,
        body: JSON.stringify(payload)
    });
    const temp = await currentSprintResponse.json();
    return temp.data;
}
export const POST_CREATE_SPRINT = async ({id, payload = {}}) => {
    const currentSprintResponse = await fetch(`http://localhost:3000/sprint/number`, {
        ...DEFAULT_POST,
        body: JSON.stringify(payload)
    });
    const temp = await currentSprintResponse.json();
    return temp.data;
}
export const POST_END_SPRINT = async ({id, payload = {}}) => {
    const currentSprintResponse = await fetch(`http://localhost:3000/sprint/end/${id}`, {
        ...DEFAULT_POST,
        body: JSON.stringify(payload)
    });
    const temp = await currentSprintResponse.json();
    return temp.data;
}