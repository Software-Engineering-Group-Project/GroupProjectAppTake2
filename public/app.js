function randomFilm() {

}

// rendering methods

function renderResults(doc) //needs minor modifications to display more data from the document, albeit this is trivial
{
    let tr = document.createElement("tr");
    let picture = document.createElement("td");
    let name = document.createElement("td");
    let relYear = document.createElement("td");
    let ageRating = document.createElement("td");
    let rating = document.createElement("td");
    let nameLink = document.createElement("a");
    let imgLink = document.createElement("img");

    tr.setAttribute("data-id", doc.id);
    nameLink.textContent = doc.data().name;
    relYear.textContent = doc.data().relYear;
    ageRating.textContent = doc.data().ageRating;
    rating.textContent = doc.data().opinion;
    imgLink.textContent = doc.data().image;

    nameLink.onclick = function() {
        renderFilm(doc);
    };
    nameLink.href = "#";

    imgLink.src = imgLink.textContent;

    picture.appendChild(imgLink);
    tr.appendChild(picture);
    name.appendChild(nameLink);
    tr.appendChild(name);
    tr.appendChild(relYear);
    tr.appendChild(ageRating);
    tr.appendChild(rating);

    document.getElementById("output").appendChild(tr);
}


//another method for dealing with displaying a page about a film when said film is clicked in a results table

function displayError() {
    document.querySelectorAll('.options').forEach(item => {
        item.style.display = 'none';
    });
    document.getElementById("the-results").style.display = "block";
    document.getElementById("results-table").style.display = "none";
    document.getElementById("nothing-found").style.display = "block";
}

function flushTable() {
    document.querySelectorAll('.options').forEach(item => {
        item.style.display = 'none';
    });
    document.getElementById("nothing-found").style.display = "none";
    document.getElementById("output").innerHTML = "";
}

function unhideTable() {
    document.getElementById("the-results").style.display = "block";
    document.getElementById("results-table").style.display = "block";
}

// Generic Search ------------------------------------------------------------------------------------

function genericSearch(input) {
    input = input.toLowerCase();


    flushTable();

    db.collection("films").where("lowercasename", "==", input).get().then(function(snapshot) {
        dealWithSnapshotResults(snapshot);
        if (!snapshot.empty) {
            unhideTable();
        }
    });
}

// Genre Search  ---------------------------------------------------------------------------------------

function searchByGenre(input) {
    flushTable();

    db.collection("films").where("genres", "array-contains", input).get().then(function(snapshot) {
        dealWithSnapshotResults(snapshot);
        if (!snapshot.empty) {
            unhideTable();
        }
    });
}

function dealWithSnapshotResults(snapshot) {
    if (!snapshot.empty) {
        snapshot.docs.forEach(doc => {
            renderResults(doc);
        });
    } else {
        displayError();
        return;
    }
}

function findGenres() {
    console.log("This is working");
    document.querySelectorAll('.options').forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById("genres-list").innerHTML = "";

    db.collection('genres').orderBy('name').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderGenre(doc);
        });
    });

    document.getElementById("genres-options").style.display = "block";
    document.getElementById("genres-list").style.display = "block";
}

function renderGenre(doc) //will need changing to accommodate looking better
{
    let li = document.createElement("li");
    let br = document.createElement("br");
    let name = document.createElement("a");
    name.className = 'genre-btn';
    const text = doc.data().name;

    li.setAttribute('data-id', doc.id);
    name.textContent = text;
    name.onclick = function() {
        searchByGenre(text);
    };

    li.style.padding = "20px 10px";

    li.appendChild(name);
    li.appendChild(br.cloneNode());
    document.getElementById("genres-list").appendChild(li);
}

function renderFilm(doc) {
    console.log("This is working");
    flushTable();
    document.querySelectorAll('.options').forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById("film-image").innerHTML = doc.data().image;
    document.getElementById("film-title").innerHTML = doc.data().name;
    document.getElementById("film-description").innerHTML = doc.data().description;

    document.getElementById("film-page").style.display = "block";

}

// New Releases Search ------------------------------------------------------------------------------

function searchByNewReleases(input) {
    flushTable();

    db.collection("films").where("new-releases", "array-contains", input).get().then(function(snapshot) {
        dealWithSnapshotResults(snapshot);
        if (!snapshot.empty) {
            unhideTable();
        }
    });
}

function findNewReleases() {
    document.querySelectorAll('.options').forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById("new-releases-list").innerHTML = "";

    db.collection('new-releases').orderBy('name').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderNewReleases(doc);
        });
    });

    document.getElementById("new-releases-options").style.display = "block";
    document.getElementById("new-releases-list").style.display = "block";
}

function renderNewReleases(doc) //will need changing to accommodate looking better
{
    let li = document.createElement("li");
    let name = document.createElement("button"); //only a temporary thing to show it works, whoever is making this look not terrible should change this to something else
    const text = doc.data().name;

    li.setAttribute('data-id', doc.id);
    name.textContent = text;
    name.onclick = function() {
        searchByNewReleases(text);
    };

    li.appendChild(name);
    document.getElementById("new-releases-list").appendChild(li);
}

// Popular Movies Serach  ---------------------------------------------------------------------------------------

function searchByPopularMovies(input) {
    flushTable();

    db.collection("films").where("popular-movies", "array-contains", input).get().then(function(snapshot) {
        dealWithSnapshotResults(snapshot);
        if (!snapshot.empty) {
            unhideTable();
        }
    });
}

function findPopularMovies() {
    document.querySelectorAll('.options').forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById("popular-movies-list").innerHTML = "";

    db.collection('popular-movies').orderBy('name').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderPopularMovies(doc);
        });
    });

    document.getElementById("popular-movies-options").style.display = "block";
    document.getElementById("popular-movies-list").style.display = "block";
}

function renderPopularMovies(doc) //will need changing to accommodate looking better
{
    let li = document.createElement("li");
    let name = document.createElement("button"); //only a temporary thing to show it works, whoever is making this look not terrible should change this to something else
    const text = doc.data().name;

    li.setAttribute('data-id', doc.id);
    name.textContent = text;
    name.onclick = function() {
        searchByPopularMovies(text);
    };

    li.appendChild(name);
    document.getElementById("popular-movies-list").appendChild(li);
}

// Top Rated Search ---------------------------------------------------------------------------------------

function searchByTopRated(input) {
    flushTable();

    db.collection("films").where("top-rated", "array-contains", input).get().then(function(snapshot) {
        dealWithSnapshotResults(snapshot);
        if (!snapshot.empty) {
            unhideTable();
        }
    });
}

function findTopRated() {
    document.querySelectorAll('.options').forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById("top-rated-list").innerHTML = "";

    db.collection('top-rated').orderBy('name').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderTopRated(doc);
        });
    });

    document.getElementById("top-rated-options").style.display = "block";
    document.getElementById("top-rated-list").style.display = "block";
}

function renderTopRated(doc) //will need changing to accommodate looking better
{
    let li = document.createElement("li");
    let name = document.createElement("button"); //only a temporary thing to show it works, whoever is making this look not terrible should change this to something else
    const text = doc.data().name;

    li.setAttribute('data-id', doc.id);
    name.textContent = text;
    name.onclick = function() {
        searchByTopRated(text);
    };

    li.appendChild(name);
    document.getElementById("top-rated-list").appendChild(li);
}