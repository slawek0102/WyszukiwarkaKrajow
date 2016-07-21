
function getMainCountryFromDB(searchCountry) {
    let url:string = 'https://restcountries.eu/rest/v1/name/' + searchCountry;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.addEventListener('load', function () {
        let country = JSON.parse(xhr.response);
        DisplayNeighbours(country[0].borders);
    });
    xhr.send();
};

function DisplayNeighbours(neighbours) {
    let countryCodesString:string = '';

    for (let singleNbr of neighbours) {
        countryCodesString = countryCodesString + singleNbr + ';'
    }

    let url:string = 'https://restcountries.eu/rest/v1/alpha?codes=' + countryCodesString;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
        let borderCountries = JSON.parse(xhr.response);
        borderCountries.forEach(function (item) {
            let countriesUlist = document.querySelector('#countries');
            let list = document .createElement('li');
            list.appendChild(document.createTextNode(item.name));
            countriesUlist.appendChild(list);
        });
    });
    xhr.send();
}

function removeChild(){
    document.querySelector('#countries').innerHTML= "";
}

window.onload = function () {
    let search = document.querySelector('#search');

    search.addEventListener('click', function () {
        let countryName = document.querySelector('#country-name');
        removeChild();
        getMainCountryFromDB(countryName.value)
    });
};





