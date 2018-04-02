

// takes input value from user text in search bar and passes to API calls
$(`#searchBar`).submit(function (event) {
    console.log(`Search Recieved!`)
    event.preventDefault();
    let search = $(`#search-term`).val();
    let location = $(`#location`).val();
    console.log(`Searching the world for how to ` + search + ` in or near ` + location + `...`);
    handleVideos(search);
    handleWiki(search);
    handleMeetups(search, location);
    handleBooks(search);
    // $(`#search-term`).val(``);
});

// takes search term and passes query to Youtube GET request
function handleVideos(search) {
    const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
    let parameters = {
        key: `AIzaSyCrVDceP1-KwRsIVi12ODPCwS2oSHe-_7k`,
        q: "How to " + search,
        part: `snippet`,
        maxResults: 30,
    };
    $.getJSON(YOUTUBE_SEARCH_URL, parameters, function (data) {
        populateResultsA(data);
        console.log(`YouTube results:`);
        console.log(data.items);
    });
}

// takes search term and passes query to Meetup GET request

function handleMeetups (search, location) {
const settings = {
        url: 'https://api.meetup.com/find/groups',
        data: {
            key: '2c4239331347a569527f52571c263c',
            location: location,
            text: search,
            upcoming_events: true,
            radius: 20,

        },
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            console.log(`MeetUp results:`);
            console.log(data.data);
            // populateResultsB(data.data);
        },
        error: function (error) {
            console.log(error);
        }
    };
    $.ajax(settings);
}

// takes search term and passes query to Wiki GET request
function handleWiki(search) {
    $.ajax({
        url: 'http://en.wikipedia.org/w/api.php',
        data: { action: 'query', list: 'search', srsearch: "How to " + search, format: 'json' },
        dataType: 'jsonp',
        success: function (data) {
            console.log(`Wiki results:`);
            console.log(data.query.search);
            // populateResultsC(data);
        },
        // error: function (error) {
        //     console.log(error);
        // }
    })
};

function handleBooks(search) {
    $.ajax({
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + "How to " + search,
        dataType: 'json',
        success: function(data) {
            console.log('Book Results:');
            console.log(data.items);
        },
        type: 'GET'
    });
}

// populates Youtube JSON results into HTML
function populateResultsA(data) {
    $(`#searchResults`).empty();
    let htmlImg = "";
    for (let i = 0; i < data.items.length; i++) {
        htmlImg += '<a href="https://www.youtube.com/watch?v=' + data.items[i].id.videoId + '" ><img id="videos" src ="' + data.items[i].snippet.thumbnails.medium.url + '"/></a>';
    };
    $(`#searchResults`).prop('hidden', false);
    $(`#searchResults`).append(htmlImg);
}

// populates Meetup JSON results into HTML
function populateResultsB(data) {
    $(`#searchResultsB`).empty();
    let html = "";
    for (let i = 0; i < data.length; i++) {
        const photoLink = data[i].key_photo.photo_link;
        html += '<img id="results" src ="'+ photoLink +'"/>';
        // console.log(photoLink);
    }
    // $("#results").wrap($('<a>', {
    //     href: '/Content/pdf/' + data.pdf1
    // }));
    $(`#searchResultsB`).prop('hidden', false);
    $(`#searchResultsB`).append(html);
}

// populates Wiki JSON results into HTML
function populateResultsC(data) {
    console.log(`data populated!`)
    $(`#searchResults`).empty();
    let html = "";
    for (let i = 0; i < data.items.length; i++) {
        html += '<img src ="' + data.query.search[i].snippet + '"/>';
    };
    $(`#searchResultsB`).prop('hidden', false);
    $(`#searchResultsB`).append(html);
}