import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

const github = axios.create({
    baseURL: GITHUB_URL
})

// Get search results
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })

    const response = await github.get(`/search/users?${params}`)

    return response.data.items
}

// Get user and repos
export const getUserandRepos = async (login) => {
    // make multiple url requests
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return {user: user.data, repos: repos.data}
}

/*
// Get search results
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`)

    // data = {totalcount: int, incomplete_results: bool, items: []}
    const {items} = await response.json()
    
    return items
}

// Get single user
export const getUser = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users/${login}`)

    if(response.status === 404) {
        window.location = '/notfound'
    }
    else {
        const data = await response.json()
    
        return data
    }
}

// Get user repos
export const getUserRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)

    const data = await response.json()
    
    return data
}
*/