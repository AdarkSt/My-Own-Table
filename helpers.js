export function findCountOf(arr, value) {
    let count = 0;
    for (let elem of arr) {
        if (elem === value)
            ++count;
    }
    return count;
}