
function randomFilm()
{
    
}


// rendering methods

function renderResults(doc) //needs minor modifications to display more data from the document, albeit this is trivial
{
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let relYear = document.createElement("td");
    let rating = document.createElement("td");

    tr.setAttribute("data-id", doc.id);
    name.textContent = doc.data().name;
    relYear.textContent = doc.data().relYear;
    rating.textContent = doc.data().opinion;

    tr.appendChild(name);
    tr.appendChild(relYear);
    tr.appendChild(rating);

    document.getElementById("output").appendChild(tr);

}

//another method for dealing with displaying a page about a film when said film is clicked in a results table

function displayError()
{
    document.querySelectorAll('.options').forEach(item =>{
        item.style.display = 'none';
    });
    document.getElementById("the-results").style.display = "block";
    document.getElementById("results-table").style.display = "none";
    document.getElementById("nothing-found").style.display = "block";

}

function flushTable()
{
    document.querySelectorAll('.options').forEach(item =>{
        item.style.display = 'none';
    });
    document.getElementById("nothing-found").style.display = "none";
    document.getElementById("output").innerHTML = "";
}

function unhideTable()
{
    document.getElementById("the-results").style.display = "block";
    document.getElementById("results-table").style.display = "block";
}



//some of the code here can definitely be re-used and would probably be best placed in a function of its own for
//all searches to use, rather than re-writing it repeatedly
function genericSearch(input)
{
    input = input.toLowerCase();

    
    flushTable();

    db.collection("films").where("lowercasename", "==", input).get().then(function(snapshot){
        dealWithSnapshotResults(snapshot);
        if (!snapshot.empty)
        {
            unhideTable();
        }
    }
    );


}

function searchByGenre(input)
{
    flushTable();

    db.collection("films").where("genres", "array-contains", input).get().then(function(snapshot){
        dealWithSnapshotResults(snapshot);
        if(!snapshot.empty){
            unhideTable();
        }
    });
}

function dealWithSnapshotResults(snapshot){
    if(!snapshot.empty){
        snapshot.docs.forEach(doc =>{
            renderResults(doc);
        });
    }
    else{
        displayError();
        return;
    }
}


function findGenres()
{
    document.querySelectorAll('.options').forEach(item =>{
        item.style.display = 'none';
    });

    document.getElementById("genres-list").innerHTML = "";

    db.collection('genres').orderBy('name').get().then((snapshot) =>{
        snapshot.docs.forEach(doc => {
            renderGenre(doc);
        });
    });

    document.getElementById("genres-options").style.display = "block";
    document.getElementById("genres-list").style.display = "block";


}

function renderGenre(doc)//will need changing to accommodate looking better
{
    let li = document.createElement("li");
    let name = document.createElement("button");//only a temporary thing to show it works, whoever is making this look not terrible should change this to something else
    const text = doc.data().name;

    li.setAttribute('data-id', doc.id);
    name.textContent = text;
    name.onclick = function(){
        searchByGenre(text);
    };

    li.appendChild(name);
    document.getElementById("genres-list").appendChild(li);

}
