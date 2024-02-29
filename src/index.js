
const axios = require('axios');
const { program } = require('commander');
const { getRandomInt } = require('phey-random-int');

program
  .option('-a, --amount <amount>', 'Amount to convert')
  .option('-f, --from <from>', 'Currency to convert from')
  .option('-t, --to <to>', 'Currency to convert to')
  .parse(process.argv);

const amount = parseFloat(program.amount);
const fromCurrency = program.from.toUpperCase();
const toCurrency = program.to.toUpperCase();

const convertCurrency = async () => {
  try {
    const a = getRandomInt(2,55);
    console.log(a)
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const rates = response.data.rates;
    if (rates.hasOwnProperty(toCurrency)) {
      const convertedAmount = amount * rates[toCurrency];
      console.log(`${amount} ${fromCurrency} equals ${convertedAmount.toFixed(2)} ${toCurrency}`);
    } else {
      console.error(`Invalid currency code: ${toCurrency}`);
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
  }
};

module.exports = { convertCurrency };
