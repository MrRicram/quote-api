const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const apiQuoteRouter = express.Router();
app.use('/api/quotes', apiQuoteRouter);

apiQuoteRouter.get('/random', (req, res, next) => {
    const randomQoute = getRandomElement(quotes);
    res.send({ quote: randomQoute });
});

apiQuoteRouter.get('/', (req, res, next) => {
    const filterQuotes = quotes.filter(quote => quote.person === req.query.person);
    if (req.query.person) {
        res.send({ quotes: filterQuotes });
    }
    else {
        res.send({ quotes: quotes });
    }
});

apiQuoteRouter.post('/', (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;

    if (newQuote != '' && newPerson != '') {        
        quotes.push({ quote: newQuote, person: newPerson });
        res.send({ quote: { quote: newQuote, person: newPerson } });
    }
    else {
        res.sendStatus(400);
    }
});


app.listen(PORT, () => {
    console.log(`Server open on port: ${PORT}`);
});