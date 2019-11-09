// form submit
document.getElementById('myForm').addEventListener('submit', function(e) {
    // get form value
    var site_name = document.getElementById('siteName').value;
    var site_url = document.getElementById('siteUrl').value;

    if (!validateForm(site_name, site_url)) {
        return false;
    }
    var bookmark = {
        name: site_name,
        url: site_url
    };
    // local storage
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();


});

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksresult = document.getElementById('bookmarksResults');
    bookmarksresult.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksresult.innerHTML += '<div class="well">' +
            '<h5>' + name + '</h5>' +
            '<a target="_balnk" href="' + addhttp(url) + '">' +
            '<i class="fas fa-external-link-alt go-link"></i>' +
            '</a>' +
            '<a  href="#" onclick="deleteBookmark(\'' + url + '\')">' +
            '<i class="fas fa-trash delete"></i>' +
            '</a>' +
            '</div>';
    }

}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}