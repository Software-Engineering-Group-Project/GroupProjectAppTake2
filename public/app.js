
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
    document.getElementById("nothing-found").style.display = "none";
    document.getElementById("output").innerHTML = "";
}



//some of the code here can definitely be re-used and would probably be best placed in a function of its own for
//all searches to use, rather than re-writing it repeatedly
function genericSearch(input)
{
    input = input.toLowerCase();

    console.log(input);

    
    document.querySelectorAll('.options').forEach(item =>{
        item.style.display = 'none';
    });
    flushTable();


    db.collection("films").where("lowercasename", "==", input).get().then(function(snapshot){
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
    );

    document.getElementById("the-results").style.display = "block";
    document.getElementById("results-table").style.display = "block";


}
