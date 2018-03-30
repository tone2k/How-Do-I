const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

$(`#searchBar`).submit(function (event) {
    console.log(`form submitted!`)
    event.preventDefault();
    let search = "How to " + $(`#search-term`).val();
    console.log(search);
    handleVideos(search);
    $(`#search-term`).val(``);
});

function populateResults(data) {
    console.log(`data populated!`)
    $(`#searchResults`).empty();
    let html = "";
    for (let i = 0; i < data.items.length; i++) {
        html += '<img src ="' + data.items[i].snippet.thumbnails.medium.url + '"/>';
    }
    $(`#searchResults`).prop('hidden', false);
    $(`#searchResults`).append(html);
}

function handleVideos(search) {
    let parameters = {
        key: `AIzaSyCrVDceP1-KwRsIVi12ODPCwS2oSHe-_7k`,
        q: search,
        part: `snippet`,
        maxResults: 8,
    };
    $.getJSON(YOUTUBE_SEARCH_URL, parameters, function (data) {
        populateResults(data);
    });
}