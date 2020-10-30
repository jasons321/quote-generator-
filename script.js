const quotecontainer = document.getElementById('quote-container')
const quotetext = document.getElementById('quote')
const authortext = document.getElementById('author')
const newquotebtn = document.getElementById('new-quote')
const twitterbtn = document.getElementById('twitter')
const loader = document.getElementById('loader')

async function getquote(){
    loading();
    const proxyurl='https://evening-plateau-56144.herokuapp.com/'
    const apiurl= 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try{
        const response=await fetch(proxyurl + apiurl);
        const data=await response.json();
        if (data.author==''){
            authortext.innerText='unknown';
        }else{
            authortext.innerText=data.quoteAuthor;
        }

        if (data.quoteText.length>120){
            quotetext.classList.add('long-quote');
        }else{
            quotetext.classList.remove('long-quote');
        }
        quotetext.innerText=data.quoteText;
        complete();
    }catch(error){
        getquote();
        console.log('no quote',error)
    }
}




  

   



function tweetquote(){
    const quote=quotetext.innerText;
    const author = authortext.innerText;
    const twitterurl=`https://twitter.com/intent/tweet?text= ${quote} - ${author}  `;
    window.open(twitterurl,'_blank');

}

 function loading(){
     loader.hidden=false
     quotecontainer.hidden=true
 }

 function complete(){
     if (!loader.hidden){
         quotecontainer.hidden=false;
         loader.hidden=true

     }
    }

newquotebtn.addEventListener('click',getquote);
twitterbtn.addEventListener('click',tweetquote);


getquote();

