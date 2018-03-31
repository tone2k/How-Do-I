const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

$(`#searchBar`).submit(function (event) {
    console.log(`form submitted!`)
    event.preventDefault();
    let search = "How to " + $(`#search-term`).val();
    let location = $(`#location`).val();
    console.log(search);
    handleVideos(search);
    handleMeetups(search, location);
    // $(`#search-term`).val(``);
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

function populateResultsB(data) {
    $(`#searchResultsB`).empty();
    let html = "";
    for (let i = 0; i < data.length; i++) {
        html += '<img src ="' + data[i].key_photo.photo_link + '"/>';
    }
    $(`#searchResultsB`).prop('hidden', false);
    $(`#searchResultsB`).append(html);
    console.log(`data populated!`)
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

function handleMeetups (search, location) {
    $.ajax({
        url: 'https://api.meetup.com/find/groups',
        data: {
            key: '2c4239331347a569527f52571c263c',
            location: location,
            text: search,
            upcoming_events: true,
            radius: 20
        },
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            console.log(data);
            populateResultsB(data.data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}