export default function randomNumber (min, max) {

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return (
        Math.floor(Math.random() * (max - min + 1) + min)
    )
}