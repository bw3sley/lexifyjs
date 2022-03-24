const Languages = {
    PT: {
        units: ["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"],
        tens: ["Dez", "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"],
        hundreds: ["Cem", "Cento", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", "Seiscentos", "Setecentos", "Oitocentos", "Novecentos"],
        outers: ["Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove"],
        suffixes: ["Mil", "Milhão", "Milhões"],
        connector: "e",
    }
}

const NUMBER_LIMIT = 1_000_000;

function transformUnits(number, language) {
    const { units } = Languages[language];
    return units[number];
}

function transformTens(number, language) {
    const { tens, outers, units, connector } = Languages[language];
    
    if (number < 10) return transformUnits(number, language);
    if (number >= 11 && number <= 19) return outers[number - 11];
    
    let ten = Math.floor(number / 10);
    let unit = number % 10;
    
    return unit === 0 ? tens[ten - 1] : `${tens[ten - 1]} ${connector} ${units[unit]}`;
}

function transformHundreds(number, language) {
    const { hundreds, connector } = Languages[language];
    
    if (number < 100) return transformTens(number, language);
    
    let hundred = Math.floor(number / 100);
    let remainder = number % 100;
    
    if (number === 100) return "Cem";
    if (remainder === 0) return hundreds[hundred];
    
    if (hundred === 1) return `Cento ${connector} ${transformTens(remainder, language)}`.trim();
    
    return `${hundreds[hundred]} ${connector} ${transformTens(remainder, language)}`.trim();
}

function transformThousands(number, language) {
    const { suffixes, connector } = Languages[language];
    
    if (number < 1000) return transformHundreds(number, language);
    
    let thousand = Math.floor(number / 1000);
    let remainder = number % 1000;
    let thousandPart;
    
    if (thousand === 1) {
        thousandPart = "Um";
    } else if (thousand < 10) {
        thousandPart = transformUnits(thousand, language);
    } else if (thousand < 100) {
        thousandPart = transformTens(thousand, language);
    } else {
        thousandPart = transformHundreds(thousand, language);
    }
    
    let thousandSuffix = suffixes[0];
    let remainderPart = remainder === 0 ? "" : transformHundreds(remainder, language).trim();
    
    if (remainderPart && remainderPart !== "Cem" && !remainderPart.startsWith(connector) && remainder < 100) {
        remainderPart = `${connector} ${remainderPart}`;
    }

    if (remainderPart && remainderPart.startsWith(connector)) {
        remainderPart = `${remainderPart}`;
    }

    return `${thousandPart} ${thousandSuffix} ${remainderPart}`.trim();
}

function transformLargeNumbers(number, language) {
    const { suffixes, connector } = Languages[language];

    if (number < 1000000) return transformThousands(number, language);
    
    let million = Math.floor(number / 1_000_000);
    let thousandRemainder = number % 1_000_000;
    
    let millionPart = million === 1 ? "Um Milhão" : `${transformUnits(million, language)} ${suffixes[2]}`;
    let remainderPart = thousandRemainder === 0 ? "" : `${connector} ${transformThousands(thousandRemainder, language)}`.trim();
    
    return `${millionPart} ${remainderPart}`.replace(`${connector} ${connector}`, `${connector}`).trim();
}

export function lexify(number, language = "PT") {
    const absoluteNumber = Math.abs(number);

    if (absoluteNumber >= NUMBER_LIMIT) return "Número é muito grande! Tente novamente.";
    
    if (isNaN(number)) return "O valor não é um número! Verifique os valores e tente novamente.";
    
    if (absoluteNumber < 10) return transformUnits(absoluteNumber, language);
    
    if (absoluteNumber < 100) return transformTens(absoluteNumber, language);
    
    if (absoluteNumber < 1000) return transformHundreds(absoluteNumber, language);
    
    return transformLargeNumbers(absoluteNumber, language);
}
