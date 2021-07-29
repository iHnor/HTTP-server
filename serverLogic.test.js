import * as logic from './serverLogic.js'

let formsOfWords = ['person', 'people', 'people'];
describe('Server logic ', () => {
    describe('Pluralization of words', () => {
        it('if we have 1 person', () => {
            let numberOfPeople = 1;
            expect(logic.pluralization(numberOfPeople, formsOfWords)).toBe(`${numberOfPeople} ${formsOfWords[0]}`);
        });
        it('if we have 3 people', () => {
            let numberOfPeople = 3;
            expect(logic.pluralization(numberOfPeople, formsOfWords)).toBe(`${numberOfPeople} ${formsOfWords[1]}`);
        });
        it('if we have 15 people', () => {
            let numberOfPeople = 15;
            expect(logic.pluralization(numberOfPeople, formsOfWords)).toBe(`${numberOfPeople} ${formsOfWords[2]}`);
        });

        it('if we have 21 people', () => {
            let numberOfPeople = 21;
            expect(logic.pluralization(numberOfPeople, formsOfWords)).toBe(`${numberOfPeople} ${formsOfWords[1]}`);
        });
    });
    describe('Word frequency if', () => {
        it('Lowercase letter', () =>{
            let map = new Map([['red', 2], ['black', 1]]);
            
            expect(logic.wordFrequency('red black red')).toEqual(map)
        })
    
        it('Some leter is capital', () => {
            let map = new Map([['red', 2]]);
    
            expect(logic.wordFrequency('red Red')).toEqual(map)
        })
    
        it('triple dou', () => {
            let map = new Map([['dou', 3]]);
    
            expect(logic.wordFrequency('dou dou dou')).toEqual(map)
        })
        it('if text have punctuation ', () => {
            let map = new Map([['dou', 3]]);
    
            expect(logic.wordFrequency('?dou, dou. dou!')).toEqual(map)
        });
    });
});
    