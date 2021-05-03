const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const btnNewQuote = document.querySelector("#new-quote");
const btnTweet = document.querySelector("#tweet");
const loader = document.querySelector("#loader");

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function loadComplete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function rngesus() {
    loading();
    let rngQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!rngQuote.author) {
        quoteAuthor.textContent = "unknown";
    } else {
        quoteAuthor.textContent = rngQuote.author;
    }
    if (rngQuote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = rngQuote.text;
    loadComplete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        rngesus();
    } catch (error) {
        console.log(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}
btnTweet.addEventListener("click", tweetQuote);
btnNewQuote.addEventListener("click", getQuotes);
getQuotes();