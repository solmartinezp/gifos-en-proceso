let trendingOne= document.getElementById('trending-one');

async function traerTrendingTerms() { 
    let url_terms= `https://api.giphy.com/v1/trending/searches?api_key=${api_key}`;
    let resp= await fetch(url_terms);
    let json= await resp.json();
    
    for (let x=0; x<5; x++) {
        let trendingTerms= document.createElement('div');
        trendingTerms.setAttribute('id', 'trending-terms');
        let txt;
        if (x!=4) {
            txt= '<h3 onclick="buscarTerm(event)">' + json.data[x]+ ',' +'</h3>';
        } else {
            txt= '<h3 onclick="buscarTerm(event)">' +json.data[x] + '</h3>';
        }
        trendingTerms.innerHTML= txt;
        trendingOne.appendChild(trendingTerms);
    }
}

traerTrendingTerms();

function buscarTerm(event) {
    let term= event.target.innerHTML;
    let newTerm= term.replace(',', '');
    searchBar.value= newTerm;
    mostrarResultados(0);
    trendingOne.style.display= "none";
}

