

// takes input value from user text in search bar and passes to API calls
$(`#searchBar`).submit(function (event) {
    console.log(`Search Recieved!`)
    event.preventDefault();
    let search = $(`#search-term`).val();
    let location = $(`#location`).val();
    console.log(`Searching the world for how to ` + search + ` in or near ` + location + `...`);
    handleMeetups(search, location);
    handleVideos(search);
    handleBooks(search);
    $(`footer`).show();
    $(`#arrowTwo`).show();
    // $(`#search-term`).val(``);
});

// takes search term and passes query to Youtube GET request
function handleVideos(search) {
    const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
    let parameters = {
        key: `AIzaSyCrVDceP1-KwRsIVi12ODPCwS2oSHe-_7k`,
        q: "How to " + search,
        part: `snippet`,
        maxResults: 10,
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
        maxResults: 12,
        dataType: 'jsonp',
        type: 'GET',
        
        success: function (data) {
            console.log(`MeetUp results:`);
            console.log(data.data);
            populateResultsB(data.data);
        },
        error: function (error) {
            console.log(error);
        }
    };
    $.ajax(settings);
}

function handleBooks(search) {
    $.ajax({
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + "How to " + search,
        dataType: 'json',
        success: function(data) {
            console.log('Book Results:');
            console.log(data.items);
            populateResultsC(data);
        },
        type: 'GET'
    });
}

// populates Youtube JSON results into HTML
function populateResultsA(data) {
    $(`#searchResults`).empty();
    let html = "";
    for (let i = 0; i < data.items.length; i++) {
        html += '<a href="https://www.youtube.com/watch?v=' + data.items[i].id.videoId + '" ><figure class="itemsContainer"><img class="videos" src ="' + data.items[i].snippet.thumbnails.medium.url + '"/><div class="play"><img class="play-btn" src="images/play.png"/> </div></figure></a>';
    };
    $(`#searchResults`).prop('hidden', false);
    $(`#searchResults`).append(html);
}

// populates Meetup JSON results into HTML
function populateResultsB(data) {
    $(`#searchResultsB`).empty();
    let html = "";
    for (let i = 0; i < 10; i++) {
        if (data[i].key_photo) {
            const photoLink = data[i].key_photo.photo_link;
            html += '<div class="card"><a href="' + data[i].link + '" ><figure><img class="meetup" id="results" src ="' + photoLink + '"/></figure></a><div class="container"><p class="text">' + data[i].description + '</p></div></div>';
        } else {
            console.log('missing photo link data');
        }
    }
    $(`#searchResultsB`).prop('hidden', false);
    $(`#searchResultsB`).append(html);
}

// populates Book JSON results into HTML
function populateResultsC(data) {
    console.log(`data populated!`)
    $(`#searchResultsC`).empty();
    let html = "";
    for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].volumeInfo) {
        html += '<a href="' + data.items[i].volumeInfo.infoLink + '" ><img class="books" id="results" src ="' + data.items[i].volumeInfo.imageLinks.thumbnail; + '"/></a>';
        } else {
            console.log('missing book link data');
        }
    };
    $(`#searchResultsC`).prop('hidden', false);
    $(`#searchResultsC`).append(html);
}


