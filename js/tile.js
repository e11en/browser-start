var _tiles = new Array();
var _tilesID = new Array();

function LoadTiles()
{
    
}

function Tile()
{
    this.id = 0;
    this.name = "";
    this.size = 2;
    this.image = "";
    this.color = "#000"
    this.position = 0;
    this.href = "google.com";
}

Tile.getNewId = function () {
    var id = 0;

    id = Math.max.apply(Math, _tilesID);

    return id + 1;
}

Tile.prototype.Html = function () {
    //var tile = this;
    var aTile = $("<a></a>");
    var divFullTile = $("<div class='fullTile'></div>");
    var divTileImg = $("<div class='tileImg'></div>");
    var pTileName = $("<p class='tileNameP'></p>");
    var divFeed = $("<div class='feed'></div>");
    var h2Feed = $("<h2></h2>");
    var pFeed = $("<p></p>");
    var divResize = $("<div class='resize' title='resize'></div>");
    var divEdit = $("<div class='edit' title='edit'></div>");

    var url = this.href;
    if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1)
        url = "http://" + url;

    aTile.addClass("tile");
    aTile.addClass("size" + this.size);

    aTile.attr("id", "tile-" + this.id);
    aTile.attr("data-id", this.id);
    aTile.attr("href", url);

    aTile.css("background-color", this.color);

    if (this.image != "null" && this.image != "") {
        divTileImg.css("background-image", "url('" + this.image + "')");
    }
    else {
        pTileName.html(this.name);
        divTileImg.append(pTileName);
    }

    divFullTile.append(divTileImg);
    aTile.append(divFullTile);
    aTile.append(divResize);
    aTile.append(divEdit);

    return aTile[0].outerHTML;
}

$(document).ready(function () {
    $.get('storage.xml', function (d) {
        $(d).find('tile').each(function () {
            var xml = $(this);

            var tile = new Tile();
            tile.id = xml.find('id').text();
            tile.name = xml.find('name').text();
            tile.size = xml.find('size').text();
            tile.image = xml.find('image').text();
            tile.color = xml.find('color').text();
            tile.position = xml.find('position').text();
            tile.href = xml.find('href').text();

            _tiles.push(tile);
            _tilesID.push(tile.id);

            $('#main').append(tile.Html());
            $('#tile-' + tile.id + ' .resize').on('click', function (e) {
                resizeTile(tile.id);
                return false;
            });
        });
    });

});

function resizeTile(tileID) {
    editXMLElement(tileID, 'size', '1');
}

function editXMLElement(id, element, txt)
{
    var test = "test";
    $.get('storage.xml', function (d) {
        $(d).find('tile').each(function () {
            var xml = $(this);
            var xmlID = xml.find('id').text();
            if (xmlID == id) {
                var el = xml.find(element);
                alert(el.text());
                xml.find(element).text('1');
                alert(el.text());  //HIER GEBLEVEN!!
            }
        });
    });

    //alert(test);
}