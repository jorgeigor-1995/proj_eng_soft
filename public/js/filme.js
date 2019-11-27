

var item = document.querySelector(".items");

for (var i = 0; i < 5; i++) {
  var articleItem = montarArticle();
  item.appendChild(articleItem);
}





function montarArticle(){
	var itemArticle = document.createElement("article");
  itemArticle.classList("itemFilme");
  itemArticle.appendChild(montarDivPoster());
  itemArticle.appendChild(montarDivData());
  return itemArticle;
}

function montarDivPoster(){
  var divPoster = document.createElement("div");
  divPoster.classList("poster");
  var img = document.createElement("img");
  img.src("");
  img.alt("");
  divPoster.appendChild(img);
  return divPoster;
}

function montarDivData(){
  var divData = document.createElement("div");
  divData.classList("data");
  var h3Data = document.createElement("h3");
  h3Data.textContent = "";
  divData.appendChild(h3Data);
  return divData;
}