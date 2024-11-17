function generateName() {
    const names = [
        // Imiona damskie
        "Anna", "Maria", "Katarzyna", "Zofia", "Julia", "Magdalena", "Aleksandra", "Joanna", 
        "Małgorzata", "Agnieszka", "Ewa", "Paulina", "Elżbieta", "Iwona", "Barbara",
        
        // Imiona męskie
        "Jan", "Marek", "Tomasz", "Piotr", "Krzysztof", "Adam", "Andrzej", "Paweł", 
        "Maciej", "Michał", "Stanisław", "Wojciech", "Łukasz", "Damian", "Jakub"
    ];
    return names[Math.floor(Math.random() * names.length)];
}

function generateSurname() {
    const surnames = [
        "Wójcik", "Woźniak", "Lis", "Zając", "Kruk", "Wilk", "Bąk", 
        "Kołodziej", "Sobczak", "Malec", "Czubak", 
        "Kłos", "Ryś", "Jeleń", "Czajka", "Orzeł", "Gąska", "Sarna", "Drozd", 
        "Kowal", "Żuraw", "Szpak", "Sikora", "Sroka", "Krzyżan", "Róg", "Borsuk", 
        "Dzik", "Łoś", "Łabędź", "Mróz", "Polak", "Rzepka", "Strąk", 
        "Kos", "Kuś", "Kochan", "Łapa", "Król", "Wieczorek", "Pawlak", "Ziółek", 
        "Mucha", "Owczarek", "Kiełbasa", "Łan", "Gaj", "Wrona", "Skowronek", 
        "Krok", "Smoleń", "Pień", "Borówka", "Gawron", "Biel", "Kępa", "Łęk", 
        "Wichura", "Głaz", "Koral", "Perła", "Jastrząb", "Lipa", "Brzoza", "Dąb", 
        "Topór", "Kuźnia", "Cis", "Modrzew", "Sosna", "Paproć", "Orlik", "Świerk", 
        "Miś", "Żubr", "Osa", "Pająk", "Koza", "Czarny", "Biały", "Ogon", "Drwal", 
        "Las", "Polański", "Nowakowski", "Podleśny", "Słowik", "Młynarz", "Głowa", 
        "Koło", "Bocian", "Żaba", "Brzost"
    ];
    return surnames[Math.floor(Math.random() * surnames.length)];
}

function generateValidIDNumber() {
    // Mapa wartości liter
    const letterValues = {
        A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 18, J: 19,
        K: 20, L: 21, M: 22, N: 23, O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29,
        U: 30, V: 31, W: 32, X: 33, Y: 34, Z: 35
    };

    // Wagi dla obliczania cyfry kontrolnej
    const weights = [7, 3, 1, 7, 3, 1, 7, 3];

    // Generowanie serii (3 losowe litery)
    const generateSeries = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
    };

    // Generowanie numeru (5 losowych cyfr)
    const generateNumber = () => {
        return Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join("");
    };

    // Obliczanie cyfry kontrolnej
    const calculateControlDigit = (series, number) => {
        const combined = [...series, ...number].map((char, index) => {
            return index < 3 ? letterValues[char] : parseInt(char, 10);
        });

        const sum = combined.reduce((acc, value, index) => acc + value * weights[index], 0);
        return sum % 10;
    };

    // Generowanie pełnego numeru dowodu
    const series = generateSeries();
    const number = generateNumber();
    const controlDigit = calculateControlDigit(series, number);

    return `${series}${controlDigit}${number}`;
}

function generateValidPesel() {
    // Funkcja pomocnicza do obliczenia cyfry kontrolnej
    function calculateChecksum(peselWithoutChecksum) {
        const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;
        for (let i = 0; i < peselWithoutChecksum.length; i++) {
            sum += (parseInt(peselWithoutChecksum[i], 10) * weights[i]) % 10;
        }
        const checksum = (10 - (sum % 10)) % 10; // Obsługuje wynik 0
        return checksum;
    }

    // Generowanie losowej daty urodzenia
    const year = Math.floor(Math.random() * 222) + 1800; // Zakres: 1800-2022
    const month = Math.floor(Math.random() * 12) + 1; // Zakres: 1-12
    const day = Math.floor(Math.random() * 28) + 1; // Zakres: 1-28 (dla uproszczenia)

    // Obsługa zmiany oznaczenia miesiąca po 1999 roku
    let yearShort = year % 100; // Ostatnie dwie cyfry roku
    let adjustedMonth = month;
    if (year >= 2000 && year <= 2099) {
        adjustedMonth += 20;
    } else if (year >= 2100 && year <= 2199) {
        adjustedMonth += 40;
    } else if (year >= 2200 && year <= 2299) {
        adjustedMonth += 60;
    } else if (year >= 1800 && year <= 1899) {
        adjustedMonth += 80;
    }

    // Generowanie liczby porządkowej (PPPP) oraz płci losowo
    let randomNumber = Math.floor(Math.random() * 5000); // Losowa liczba porządkowa (0-4999)
    if (Math.random() < 0.5) {
        randomNumber = randomNumber - (randomNumber % 10); // Parzysta (kobieta)
    } else {
        randomNumber = randomNumber - (randomNumber % 10) + 1; // Nieparzysta (mężczyzna)
    }

    // Formatowanie elementów PESEL
    const peselWithoutChecksum = [
        yearShort.toString().padStart(2, '0'),
        adjustedMonth.toString().padStart(2, '0'),
        day.toString().padStart(2, '0'),
        randomNumber.toString().padStart(4, '0')
    ].join('');

    // Obliczenie cyfry kontrolnej
    const checksum = calculateChecksum(peselWithoutChecksum);

    // Złożenie pełnego numeru PESEL
    return peselWithoutChecksum + checksum;
}

function generateAccountNumber() {
    const unitCodes = [
        "10100000", "10100039", "10100055", "10100068", "10101010", 
        "10101023", "10101049", "10101078", "10101140", "10101212", 
        "10101238", "10101270", "10101339", "10101371", "10101397", 
        "10101401", "10101469", "10101528", "10101599", "10101674"
    ];

    // Generowanie losowego kodu jednostki
    const randomUnitCode = unitCodes[Math.floor(Math.random() * unitCodes.length)];

    // Generowanie losowej części IBAN
    const randomPart = String(Math.floor(Math.random() * 1e16)).padStart(16, '0');

    // Tworzenie podstawy IBAN
    const baseIban = randomUnitCode + randomPart;

    // Obliczanie sumy kontrolnej IBAN
    const controlSumBase = BigInt(baseIban + "252100"); // Przekształć ciąg znaków na BigInt
    const controlNumber = String(98n - (controlSumBase % 97n)).padStart(2, '0');

    // Finalny numer konta
    return controlNumber + baseIban;
}


chrome.contextMenus.create({
    id: "parentMenu",
    title: "Wstaw dane losowe",
    contexts: ["editable"]
});

chrome.contextMenus.create({
    id: "generateName",
    parentId: "parentMenu",
    title: "Wstaw imię",
    contexts: ["editable"]
});

chrome.contextMenus.create({
    id: "generateSurname",
    parentId: "parentMenu",
    title: "Wstaw nazwisko",
    contexts: ["editable"]
});

chrome.contextMenus.create({
    id: "generateValidIDNumber",
    parentId: "parentMenu",
    title: "Wstaw numer dowodu",
    contexts: ["editable"]
});

chrome.contextMenus.create({
    id: "generateValidPesel",
    parentId: "parentMenu",
    title: "Wstaw numer PESEL",
    contexts: ["editable"]
});

chrome.contextMenus.create({
    id: "generateAccountNumber",
    parentId: "parentMenu",
    title: "Wstaw numer konta bankowego",
    contexts: ["editable"]
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    let generatedData = "";

    switch (info.menuItemId) {
        case "generateName":
            generatedData = generateName();
            break;
        case "generateSurname":
            generatedData = generateSurname();
            break;
        case "generateValidIDNumber":
            generatedData = generateValidIDNumber();
            break;
        case "generateValidPesel":
            generatedData = generateValidPesel();
            break;
        case "generateAccountNumber":
            generatedData = generateAccountNumber();
            break;
        default:
            return;
    }

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (data) => {
            const activeElement = document.activeElement;
            activeElement.value += data;
            
            const event = new Event('input', { bubbles: true });
            activeElement.dispatchEvent(event);
        },
        args: [generatedData]
    });
    
});
