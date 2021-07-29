export function pluralization(numberOfOld, words) {

    let sNumb = numberOfOld % 10
    let dNumb = numberOfOld % 100

    if ((10 <= dNumb && dNumb <= 20) || (sNumb == 0) || (5 <= sNumb && sNumb <= 20))
        return `${numberOfOld} ${words[1]}`;
    else if (numberOfOld == 1)
        return `${numberOfOld} ${words[0]}`;
    else
        return `${numberOfOld} ${words[2]}`;
};

export function wordFrequency (text){
    let words = text.replace(/[.,!?]/g,'').toLowerCase().split(' ');
    let map = new Map();

    for (let i = 0; i < words.length; i++){ 
        let word = words[i];
        
        if (map.has(word)) {
            let count = map.get(word)
            map.set(word, count + 1);
        }
        else {
            map.set(word, 1);
         
        }
    }
    return map;
};

