import { addition } from "@src/calculator";

describe('Calculator', () => {
    describe('addition', () => {
        it('Should return the result of adding provided args together.', () => {
            expect(addition(0, 0)).toEqual(0);
        });
    });
});