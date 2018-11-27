$(document).ready(function () {
    // click the button to drop content
    function clickButton() {
        if ($(".dropdownbtn").hasClass("open")) {
            $(".dropdownbtn").removeClass("open");
            $(".container").hide();
            clear();
        } else {
            $(".dropdownbtn").addClass("open");
            $(".container").show();
            $.getJSON("/lops", function (data) {
                $.each(data, function (index, object) {
                    appendListItems(object);
                });
            });
        }
    }
    function appendListItems(lop) {
        $("ol").append('<li><a href="/persons?tenLop=' + lop + '" id="' + lop + '">' + lop + '</a></li>');
    }
    function clear() {
        $("ol").empty();
    }

    //draggable button (w3schools standard)
    //main thing is to find the new coordinates of the mouse and calculate the offset of the div according to
    // the mouse's new coordinates.
    $("#mydiv").mousedown(dragElement($("#mydiv")));
    function dragElement(elemnt) {
        var lengthX = 0;
        var lengthY = 0;
        var posX = 0;
        var posY = 0;

        if (elemnt.has("#mydivbutton")) {
            $("#mydivbutton").mousedown(dragMouseDown);
        } else {
            dragMouseDown;
        }
        //do when mousedown
        function dragMouseDown(e) {
            e.preventDefault();
            posX = e.pageX;
            posY = e.pageY;
            $(document).mousemove(dragElement);
            $(document).mouseup(function () {
                $(document).off("mousemove");
            });
        }
        //do when mousedown and move
        function dragElement(e) {
            e.preventDefault();
            $("#mydivbutton").addClass("drag");
            lengthX = posX - e.pageX;
            lengthY = posY - e.pageY;
            posX = e.pageX;
            posY = e.pageY;
            elemnt.css("top", (elemnt.offset().top - lengthY) + "px");
            elemnt.css("left", (elemnt.offset().left - lengthX) + "px");
        }
    }

    //check if element have been dragged or clicked
    //the main idea is adding a marked class to the div then whether it have this mark or not, we execute
    //according to.
    $("#mydivbutton").mouseup(function () {
        checkEvent($("#mydivbutton"));
    });
    function checkEvent(elemnt) {
        if (elemnt.hasClass("drag")) {
            elemnt.removeClass("drag");
        } else {
            clickButton($("#mydivbutton"));
        }
    }

    //select a specific links to load JSON and make table
    $("ol").on("click", function (event) {
        event.preventDefault();
        $.getJSON($(event.target).attr("href"), function (data) {
            if ($(".mytablecontainer").hasClass("loaded")) {
                $(".mytablecontainer").empty().removeClass("loaded");
                makeTable(data);
                addCSS();
            } else {
                makeTable(data);
                addCSS();
            }
        });

        //make table
        function makeTable(data) {
            var table = "<table>";
            var header = "<thead><tr><th>stt</th>";
            for (var key in data[0]) {
                header += "<th>" + key + "</th>";
            }
            header += "</tr></thead>";
            table += header;

            $.each(data, function (index, object) {
                var tableRow = "<tr>";
                tableRow += "<td>" + (index + 1) + "</td>";
                $.each(object, function (i, value) {
                    tableRow += "<td>" + value + "</td>";
                });
                tableRow += "</tr>";
                table += tableRow;
            });
            table += "</table>";
            $(".mytablecontainer").append(table).addClass("loaded").css("display", "block");
        }
        function addCSS() {
            $("table").addClass("mytable");
        }
    });
});