export function setJWTtoken(token) {
    return {
        type: 'TOKEN',
        token
    }
}

export function setThumbnailData(data) {
    return {
        type: 'THUMBDATA',
        data
    }
}

export function setQuizData(data, id, type) {
    return {
        type: 'QUIZDATA',
        data
    }
}
