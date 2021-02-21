const getTokenRecaptcha = e => {
    e.preventDefault();
    window.grecaptcha.execute();
}
module.exports = {
    getTokenRecaptcha
}