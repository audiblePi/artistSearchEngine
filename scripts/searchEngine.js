var apiKey = "H0EBFFIJHFKHYFA4X";
var webServiceUrl = "http://developer.echonest.com/api/v4/";
var data;



/****************
get artist
search echoNest
*****************/
function searchArtist()
{
    var search = "artist";
    var resultBox = document.getElementById("results");
    var artistName = document.getElementById("searchInput").value;
    var searchUrl = webServiceUrl + "artist/search?api_key=" + apiKey + "&format=json&name=" + artistName;
    resultBox.innerHTML = "";
    var data;
     
   function query(webServiceUrl) 
   {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", webServiceUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    data = JSON.parse(query(searchUrl));
    
    if (data.response.artists.length > 0) 
    {
        displayArtist(data, resultBox);
    }//end if()
    else
    {
        document.getElementById("searchInput").value = null;
        document.getElementById("searchInput").placeholder = "Please try again";
    }
}//end searchArtist()




/****************
display results
anonymous onClick
*****************/
function displayArtist(data, div)
{
    //for ( var i = 0; i < data.response.artists.length; ++i )
    //{
        var result = document.createElement( "div" );
        var field = document.createElement( "fieldset" );
        
        //result.onclick = function() { getDetails(this.id); };
        result.id = data.response.artists[0].id;
        result.innerHTML = data.response.artists[0].name;
        field.appendChild(result);
        div.appendChild(field);
        getDetails(result.id);
    //}//end for
}//displayArtists()




/****************
get details
setup menu
*****************/
function getDetails(artistId)
{
    
    var artistBox = document.getElementById(artistId);
    var detailMenu = new Array();
    
    artistBox.onclick = "null";
    detailMenu[0] = "Genre";
    detailMenu[1] = "Hotness";
    detailMenu[2] = "Similar_Artists";
    detailMenu[3] = "News";
    
    for (var i=0; i<detailMenu.length; i++)
    {
    var getDetail = detailMenu[i];
        var detail = document.createElement( "div" );
        var menuField = document.createElement( "fieldset" );
        var detailId = "detail" + detailMenu[i];
        
        detail.id = detailId;
        detail.innerHTML = "";
        menuField.appendChild(detail);
        artistBox.appendChild(menuField);
    }
    
    getGenre(artistId, "detailGenre");
    getHotness(artistId, "detailHotness");
    getSimilar(artistId, "detailSimilar_Artists");
    getNews(artistId, "detailNews");
}//getDetails()




/****************
get genre
display genre
*****************/
function getGenre(id, divId)
{
    var search = "genre";
    var div = document.getElementById(divId);
    var searchUrl = webServiceUrl + "artist/terms?api_key=" + apiKey + "&id=" + id + "&sort=weight&format=json";
    var data;
    
   function query(url) 
   {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    data = JSON.parse(query(searchUrl));
    
    if (data.response.status.code == 0) 
    {
        displayGenre(data, div);
    }//end if()
    else
        window.alert("Trouble getting genre " + data.response.status.message);
}//getGenre()

function displayGenre(data, div)
{
    var response = "Genre:<ul><li>";
    for ( var i = 0; i < 3; ++i )
    {
        var genre = data.response.terms[i].name;
        response = response + genre;
        if (i < 2)
            response = response + "/";
    }
    div.innerHTML = response + "</li></ul>";
}//end displayGenre()





/****************
get hotttnesss
display hotttnesss
*****************/
function getHotness(id, divId)
{
    var search = "hotttnesss";
    var div = document.getElementById(divId);
    var searchUrl = webServiceUrl + "artist/hotttnesss?api_key=" + apiKey + "&id=" + id + "&format=json";
    
    var data;
    
    function query(url) 
    {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    data = JSON.parse(query(searchUrl));
    
    if (data.response.status.code == 0) 
    {
        displayHotttnesss(data, div);
    }//end if()
    else
        window.alert("Trouble getting genre " + data.response.status.message);
}//end getHotness()

function displayHotttnesss(data, div)
{
    var response = "Hotttness<ul>";
    div.innerHTML = response + "<li>" + data.response.artist.hotttnesss + "</li></ul>";
}//displayHotttnesss()





/**********************
get similar artists
display similar artists
***********************/
function getSimilar(id, divId)
{
    var search = "similar";
    var div = document.getElementById(divId);
    var searchUrl = webServiceUrl + "artist/" + search + "?api_key=" + apiKey + "&id=" + id + "&format=json&results=3&start=0";
    var data;
    
    function query(url) 
    {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    data = JSON.parse(query(searchUrl));
    
    if (data.response.status.code == 0) 
    {
        displaySimilar(data, div);
    }//end if()
    else
        window.alert("Trouble getting genre " + data.response.status.message);
}//end getSimilar()

function displaySimilar(data, div)
{
    var response = "Similar Artists:<ol>";
    for ( var i = 0; i < data.response.artists.length; ++i )
        response = response + "<li>" + data.response.artists[i].name + "</li>";
    div.innerHTML = response + "</ol>";
}//end displaySimilar()





/****************
get news
display news
*****************/

function getNews(id, divId)
{
    var search = "news";
    var div = document.getElementById(divId);
    var searchUrl = webServiceUrl + "artist/" + search + "?api_key=" + apiKey + "&id=" + id + "&format=json&results=3&start=0";
    var data;
    
    function query(url) 
    {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    data = JSON.parse(query(searchUrl));
    
    if (data.response.status.code == 0) 
    {
        displayNews(data, div);
    }//end if()
    else
        window.alert("Trouble getting genre " + data.response.status.message);
}//end getNews()

function displayNews(data, div)
{
    var response = "Latest News Links:<ol>";
    for ( var i = 0; i < data.response.news.length; ++i )
    {
        var title = data.response.news[i].name;
        var url = data.response.news[i].url;
        response = response + "<li><a href='" + url +"' target='_blank'>" + title + "</a></li>";
    }
    div.innerHTML = response + "</ol>";
}//end displaySimilar()






function start()
{
    document.getElementById( "submitButton" ).addEventListener("click", function() { searchArtist(); }, false );
}//end start()

window.addEventListener( "load", start, false );