import React, {useState} from 'react';
import './App.scss';
import './api';
import {convert} from './api';
import FormControl from '@mui/material/FormControl';
import {BootstrapInput} from './BootstrapInput';
import InputLabel from '@mui/material/InputLabel';
import {NativeSelect} from '@mui/material';

function App() {
    const [UsdUahRate, setUsdUahRate] = useState(0);
    const [EurUahRate, setEurUahRate] = useState(0);
    const [UsdEurRate, setUsdEurRate] = useState(0);
    const [firstCurrency, setFirstCurrency] = useState('USD');
    const [secondCurrency, setSecondCurrency] = useState('UAH');
    const [firstInputValue, setFirstInputValue] = useState(0);
    const [secondInputValue, setSecondInputValue] = useState(0);

    convert('USD', 'UAH', setUsdUahRate);
    convert('EUR', 'UAH', setEurUahRate);
    convert('USD', 'EUR', setUsdEurRate);

    const handleFirstCurrencyChange = (value: any) => {
        setFirstCurrency(value);
    };

    const handleSecondCurrencyChange = (value: any) => {
        setSecondCurrency(value);
    };

    const handleFirstInputChange = (value: any) => {
        setFirstInputValue(value); //value = 1
        console.log(firstInputValue); //0
        const calculated = calculateValue(firstInputValue, firstCurrency, secondCurrency); //первым параметром туда
        //передаётся 0, соответственно возвращается тоже 0. Нужное значение передаётся только при повторном вызове handleFirstInputChange
        setSecondInputValue(calculated);
        console.log(secondInputValue); //Должно быть 36.41, на деле 0
    };
    const handleSecondInputChange = (value: any) => {
        setSecondInputValue(value);
    };

    const calculateValue = (value: number, first: string, second: string): number => {
        const UsdToUah = +value * UsdUahRate;
        const UsdToEur = +value * UsdEurRate;
        const UahToUsd = +value / UsdUahRate;
        const UahToEur = +value / EurUahRate;
        const EurToUsd = +value / UsdEurRate;
        const EurToUah = +value * EurUahRate;

        if (first === 'USD') {
            switch (second) {
            case 'UAH':
                return UsdToUah;
            case 'EUR':
                return UsdToEur;
            default:
                return value;
            }
        }

        if (first === 'UAH') {
            switch (second) {
            case 'USD':
                return UahToUsd;
            case 'EUR':
                return UahToEur;
            default:
                return value;
            }
        }

        if (first === 'EUR') {
            switch (second) {
            case 'UAH':
                return EurToUah;
            case 'USD':
                return EurToUsd;
            default:
                return value;
            }
        }

        return 0;
    };

    return (
        <div className="App">
            <header className="header">
                <p className="header__text">USD to UAH - {UsdUahRate}</p>
                <p className="header__text">EUR to UAH - {EurUahRate}</p>
            </header>

            <div className="main">
                <h1 className="main__title">Currency converter</h1>
                <div>
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="demo-customized-textbox">Value</InputLabel>
                        <BootstrapInput
                            id="demo-customized-textbox"
                            value={firstInputValue}
                            onChange={e => handleFirstInputChange(e.target.value)}
                            type="number"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="demo-customized-select-native">Currency</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={firstCurrency}
                            onChange={e => handleFirstCurrencyChange(e.target.value)}
                            input={<BootstrapInput />}
                        >
                            <option value={'USD'}>USD</option>
                            <option value={'UAH'}>UAH</option>
                            <option value={'EUR'}>EUR</option>
                        </NativeSelect>
                    </FormControl>
                </div>

                <div>
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="demo-customized-textbox">Value</InputLabel>
                        <BootstrapInput
                            id="demo-customized-textbox"
                            value={secondInputValue}
                            onChange={e => handleSecondInputChange(e.target.value)}
                            type="number"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="demo-customized-select-native">Currency</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={secondCurrency}
                            onChange={e => handleSecondCurrencyChange(e.target.value)}
                            input={<BootstrapInput />}
                        >
                            <option value={'USD'}>USD</option>
                            <option value={'UAH'}>UAH</option>
                            <option value={'EUR'}>EUR</option>
                        </NativeSelect>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default App;
