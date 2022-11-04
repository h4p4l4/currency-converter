import React, {useEffect, useState} from 'react';
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
    const [firstCurrencyItem, setFirstCurrencyItem] = useState('USD');
    const [secondCurrencyItem, setSecondCurrencyItem] = useState('UAH');
    const [firstInputValue, setFirstInputValue] = useState(0);
    const [secondInputValue, setSecondInputValue] = useState(0);
    const [inputInFocus, setInputInFocus] = useState('');

    useEffect(() => {
        convert('USD', 'UAH', setUsdUahRate);
        convert('EUR', 'UAH', setEurUahRate);
        convert('USD', 'EUR', setUsdEurRate);
    }, []);

    const handleFirstCurrencyChange = (value: any) => {
        setFirstCurrencyItem(value);
    };

    const handleSecondCurrencyChange = (value: any) => {
        setSecondCurrencyItem(value);
    };

    const handleFirstInputChange = (value: any) => {
        if (value !== '-') {
            setFirstInputValue(value);
        }
    };
    const handleSecondInputChange = (value: any) => {
        if(value !== '-') {
            setSecondInputValue(value);
        }
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
                return +UsdToUah.toFixed(2);
            case 'EUR':
                return +UsdToEur.toFixed(2);
            default:
                return value;
            }
        }

        if (first === 'UAH') {
            switch (second) {
            case 'USD':
                return +UahToUsd.toFixed(2);
            case 'EUR':
                return +UahToEur.toFixed(2);
            default:
                return value;
            }
        }

        if (first === 'EUR') {
            switch (second) {
            case 'UAH':
                return +EurToUah.toFixed(2);
            case 'USD':
                return +EurToUsd.toFixed(2);
            default:
                return value;
            }
        }

        return 0;
    };

    return (
        <div className="App">
            <header className="header">
                {
                    UsdUahRate && EurUahRate
                        ? (
                            <div className="header__main">
                                <p className="header__text">USD to UAH - {UsdUahRate}</p>
                                <p className="header__text">EUR to UAH - {EurUahRate}</p>
                            </div>
                        )
                        : (
                            <p className="header__text">Loading...</p>
                        )
                }

            </header>

            <div className="main">
                <h1 className="main__title">Currency converter</h1>
                <div>
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="demo-customized-textbox">Value</InputLabel>
                        <BootstrapInput
                            id="demo-customized-textbox"
                            value=
                                {
                                    inputInFocus === 'first'
                                        ? firstInputValue
                                        : calculateValue(secondInputValue, secondCurrencyItem, firstCurrencyItem)
                                }
                            onChange={e => handleFirstInputChange(e.target.value)}
                            onFocus={() => setInputInFocus('first')}
                            type="number"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="demo-customized-select-native">Currency</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={firstCurrencyItem}
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
                            value=
                                {
                                    inputInFocus === 'second'
                                        ? secondInputValue
                                        : calculateValue(firstInputValue, firstCurrencyItem, secondCurrencyItem)

                                }
                            onFocus={() => setInputInFocus('second')}
                            onChange={e => handleSecondInputChange(e.target.value)}
                            type="number"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="demo-customized-select-native">Currency</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={secondCurrencyItem}
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
