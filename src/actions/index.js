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

export function setQuizData(data) {
    return {
        type: 'QUIZDATA',
        data
    }
}
