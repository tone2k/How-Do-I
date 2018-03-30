const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
$(document).ready(function () {
    
$(`#videoForm`).submit(function (event) {
    console.log(`form submitted!`)
    event.preventDefault();
    let search = $(`#search-term`).val();
    handleVideos(search);
    $(`#search-term`).val(``);
});

function populateResults(data) {
    console.log(`data populated!`)
    $(`#videoResults`).empty();
    let html = "";
    for (let i = 0; i < data.items.length; i++) {
        html += '<img src ="' + data.items[i].snippet.thumbnails.medium.url + '" class="image-styles" />';
        // videoId = data.items[i].snippet.resourceId.videoId

        // '<li><iframe src=\"//www.youtube.com/embed/'+videoId+'\" ></iframe></li>'
    }
    $(`#videoResults`).prop('hidden', false);
    $(`#videoResults`).append(html);
}

function handleVideos(search) {
    let parameters = {
        key: `AIzaSyCrVDceP1-KwRsIVi12ODPCwS2oSHe-_7k`,
        q: $(`#search-term`).val(),
        part: `snippet`,
        maxResults: 25,
    };
    $.getJSON(YOUTUBE_SEARCH_URL, parameters, function (data) {
        populateResults(data);
    });
}
});