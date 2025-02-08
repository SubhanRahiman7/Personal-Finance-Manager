export class CurrencyConverter {
    constructor() {
        this.API_KEY = 'cur_live_D50YxCndf4376lO5a57F2Fok8RVSRz4zV7sLu5q0';
        this.BASE_URL = 'https://api.currencyapi.com/v3';
        
        // Get DOM elements
        this.amountInput = document.getElementById('amount-input');
        this.fromCurrency = document.getElementById('from-currency');
        this.toCurrency = document.getElementById('to-currency');
        this.convertBtn = document.getElementById('convert-btn');
        this.swapBtn = document.getElementById('swap-currency');
        this.resultDisplay = document.getElementById('result-display');
        this.rateInfo = document.getElementById('rate-info');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.convertBtn.addEventListener('click', () => this.convertCurrency());
        this.swapBtn.addEventListener('click', () => this.swapCurrencies());

        // Add input event for real-time conversion
        this.amountInput.addEventListener('input', () => {
            if (this.amountInput.value) {
                this.convertCurrency();
            }
        });
    }

    async convertCurrency() {
        try {
            const amount = parseFloat(this.amountInput.value);
            if (isNaN(amount) || amount <= 0) {
                this.resultDisplay.innerHTML = `
                    <span class="amount">0.00</span>
                    <span class="currency">${this.toCurrency.value}</span>
                `;
                this.rateInfo.textContent = `1 ${this.fromCurrency.value} = 0.00 ${this.toCurrency.value}`;
                return;
            }

            // Updated API endpoint for conversion
            const response = await fetch(`${this.BASE_URL}/latest?apikey=${this.API_KEY}&base_currency=${this.fromCurrency.value}&currencies=${this.toCurrency.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            
            if (data && data.data && data.data[this.toCurrency.value]) {
                const rate = data.data[this.toCurrency.value].value;
                const convertedAmount = (amount * rate).toFixed(2);
                
                // Update result display
                this.resultDisplay.innerHTML = `
                    <span class="amount">${convertedAmount}</span>
                    <span class="currency">${this.toCurrency.value}</span>
                `;
                
                // Update rate info
                this.rateInfo.textContent = `1 ${this.fromCurrency.value} = ${rate.toFixed(4)} ${this.toCurrency.value}`;
            } else {
                throw new Error('Invalid API response format');
            }
        } catch (error) {
            console.error('Currency conversion error:', error);
            this.resultDisplay.innerHTML = `
                <span class="amount error">Error</span>
            `;
            this.rateInfo.textContent = 'Failed to convert currency. Please try again.';
        }
    }

    swapCurrencies() {
        // Store current values
        const tempCurrency = this.fromCurrency.value;
        const tempAmount = this.amountInput.value;

        // Swap currencies
        this.fromCurrency.value = this.toCurrency.value;
        this.toCurrency.value = tempCurrency;

        // Trigger conversion if amount exists
        if (tempAmount) {
            this.convertCurrency();
        }
    }
}

// Initialize currency converter
document.addEventListener('DOMContentLoaded', () => {
    const currencyConverter = new CurrencyConverter();
}); 