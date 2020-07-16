export default function priceSplit(num) {
    let arr = [];
    let string = num.toString();
    if (string.length % 3) arr.push(string.slice(0, string.length % 3));
    for (let i = string.length % 3; i < string.length; i += 3) {
        arr.push(string.slice(i, i + 3))
    }
    return arr.join(' ');
}