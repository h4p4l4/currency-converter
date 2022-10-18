const BASE_URL = 'https://currency-converter-by-api-ninjas.p.rapidapi.com';

export const convert = (firstCurrency: string, secondCurrency: string, setRate: CallableFunction) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'eb425f0b20msh764f5a488cc4ee3p1cd772jsn116ca89b725f',
            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
        }
    };

    fetch(`${BASE_URL}/v1/convertcurrency?have=${firstCurrency}&want=${secondCurrency}&amount=1`, options)
        .then(response => response.json())
        .then(response => setRate(response.new_amount))
        .catch(err => console.error(err));

};
