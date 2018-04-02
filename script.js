const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

$(`#searchBar`).submit(function (event) {
    console.log(`form submitted!`)
    event.preventDefault();
    let search = "How to " + $(`#search-term`).val();
    let location = $(`#location`).val();
    console.log(search);
    handleVideos(search);
    handleWiki(search);
    // handleImages(search);
    // handleMeetups(search, location);
    // $(`#search-term`).val(``);
});

function populateResults(data) {
    console.log(`youtube data populated!`)
    console.log(data);
    $(`#searchResults`).empty();
    let html = "";
    for (let i = 0; i < data.items.length; i++) {
        // html += '<p>' + data.items[i].snippet.title + '</p>';
        html += '<a href="https://www.youtube.com/watch?v=' + data.items[i].id.videoId + '" ><img src ="' + data.items[i].snippet.thumbnails.medium.url + '"/></a>';
    }
    $(`#searchResults`).prop('hidden', false);
    $(`#searchResults`).append(html);
}

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


// function populateResultsB(data) {
//     $(`#searchResultsB`).empty();
//     let html = "";
//     for (let i = 0; i < data.length; i++) {
//         const photoLink = data[i].key_photo.photo_link;
//         html += '<img id="results" src ="'+ photoLink +'"/>';
//         // console.log(photoLink);
//     }
//     // $("#results").wrap($('<a>', {
//     //     href: '/Content/pdf/' + data.pdf1
//     // }));
//     $(`#searchResultsB`).prop('hidden', false);
//     $(`#searchResultsB`).append(html);
// }

function handleVideos(search) {
    let parameters = {
        key: `AIzaSyCrVDceP1-KwRsIVi12ODPCwS2oSHe-_7k`,
        q: search,
        part: `snippet`,
        maxResults: 15,
    };
    $.getJSON(YOUTUBE_SEARCH_URL, parameters, function (data) {
        populateResults(data);
        // console.log(data);
    });
}

// function handleImages(search) {
//     let parameters = {
//         key: `AIzaSyCrVDceP1-KwRsIVi12ODPCwS2oSHe-_7k`,
//         q: search,
//         num: 16,
//         start: 1,
//         imgSize: `medium`,
//         searchType: `image`,
//         fileType: `jpg`,
//         cx: `006695032219573469833:ady2qaeevru`,
//     };
//     const GOOGLE_SEARCH_URL = 'https://www.googleapis.com/customsearch/v1';
//     $.getJSON(GOOGLE_SEARCH_URL, parameters, function (data) {
//         populateResults(data);
//         console.log(data);
//     });
// }

// function handleMeetups (search, location) {
// const settings = {
//         url: 'https://api.meetup.com/find/groups',
//         data: {
//             key: '2c4239331347a569527f52571c263c',
//             location: location,
//             text: search,
//             upcoming_events: true,
//             radius: 20,

//         },
//         dataType: 'jsonp',
//         type: 'GET',
//         success: function (data) {
//             // console.log(data);
//             populateResultsB(data.data);
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     };
//     $.ajax(settings);
// }

function handleWiki(search) {
        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php',
            data: { action: 'query', list: 'search', srsearch: search, format: 'json' },
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
                populateResultsC(data);
            }
        })};