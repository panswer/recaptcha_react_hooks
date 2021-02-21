function registerLogic(setData, e, state) {
    e.preventDefault();
    if (
        e.target.type === 'email' ||
        e.target.type === 'password'
    ) {
        setData({
            ...state,
            [e.target.name]: e.target.value
        });
    } else if (e.target.nodeName === 'SELECT') {
        setData({
            ...state,
            [e.target.name]: {
                [e.target.value]: e.target.value,
                [e.target.value]: e.target.value
            }
        });
    }
}

module.exports = {
    registerLogic
}