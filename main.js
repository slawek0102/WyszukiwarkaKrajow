function getMainCountryFromDB(searchCountry) {
    var url = 'https://restcountries.eu/rest/v1/name/' + searchCountry;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
        var country = JSON.parse(xhr.response);
        DisplayNeighbours(country[0].borders);
    });
    xhr.send();
}
;
function DisplayNeighbours(neighbours) {
    var countryCodesString = '';
    for (var _i = 0, neighbours_1 = neighbours; _i < neighbours_1.length; _i++) {
        var singleNbr = neighbours_1[_i];
        countryCodesString = countryCodesString + singleNbr + ';';
    }
    var url = 'https://restcountries.eu/rest/v1/alpha?codes=' + countryCodesString;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
        var borderCountries = JSON.parse(xhr.response);
        borderCountries.forEach(function (item) {
            var countriesUlist = document.querySelector('#countries');
            var list = document.createElement('li');
            list.appendChild(document.createTextNode(item.name));
            countriesUlist.appendChild(list);
        });
    });
    xhr.send();
}
function removeChild() {
    document.querySelector('#countries').innerHTML = "";
}
window.onload = function () {
    var search = document.querySelector('#search');
    search.addEventListener('click', function () {
        var countryName = document.querySelector('#country-name');
        removeChild();
        getMainCountryFromDB(countryName.value);
    });
};
//# sourceMappingURL=main.js.map