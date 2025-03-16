public execFunction(num: number) {
    const licenceGenerated: string = this.getLicensePlate(26**5 * 10);
    console.log(licenceGenerated)
}

public getLicensePlate(num: number): string {
    const segmentSizes = [
        1e6,          // k=0: 000000 to 999999 (1,000,000 plates)
        26e5,         // k=1: 00000A to 99999Z (260,000 plates)
        26**2 * 1e4,  // k=2: 0000AA to 9999ZZ (6,760,000 plates)
        26**3 * 1e3,  // k=3: 000AAA to 999ZZZ (17,576,000 plates)
        26**4 * 1e2,  // k=4: 00AAAA to 99ZZZZ (45,697,600 plates)
        26**5 * 10,   // k=5: 0AAAAA to 9ZZZZZ (118,813,760 plates)
        26**6          // k=6: AAAAAA to ZZZZZZ (308,915,776 plates)
    ];

    const max = segmentSizes.reduce((prev, current)=> prev + current, 0) // if greater than max, print ZZZZZZ
    if(num >= max) {
        return 'ZZZZZZ'
    }
    
    let cumulator = 0;
    let counter: number;

    for (counter = 0; counter < segmentSizes.length; counter++) {
        const size = segmentSizes[counter];
        if (num < cumulator + size) {
            break;
        }
        cumulator += size;
    }

    const offset = num - cumulator;
    const digitsLength = 6 - counter;
    const divisor = 10 ** digitsLength;
    const lettersIndex = Math.  floor(offset / divisor);
    const numericPartValue = offset % divisor;
    const numericPartStr = numericPartValue.toString().padStart(digitsLength, '0');
    const lettersPart = this.numberToLetters(lettersIndex, counter);

    return counter < 6 ? numericPartStr + lettersPart : lettersPart;
}

public numberToLetters(num: number, length: number): string {
    if (length === 0) return '';
    let letters: string[] = [];
    let remaining = num;
    for (let i = 0; i < length; i++) {
        const remainder = remaining % 26;
        letters.push(String.fromCharCode(65 + remainder)); // 'A' is 65
        remaining = Math.floor(remaining / 26);
    }
    return letters.reverse().join('');
}