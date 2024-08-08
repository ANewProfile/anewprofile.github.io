// IMPORTANT: consult these docs
// lodash: https://lodash.com/docs/4.17.15
// jquery: https://api.jquery.com/
  
$(document).ready(function() {
    function clear_list(which_list, add_option) {
        if (add_option === true) {
            $("#list"+which_list).empty();
            $("#list"+which_list).append("<option value='-' disabled selected>Choose an option</option>");
        }
        else {
            $("#list"+which_list).empty();
            // console.log("emptied list "+which_list)
        }
    }

    function clear_lists(start_list) {
        // console.log("start_list: "+start_list);
        var next_list = start_list+1;
        // console.log("next_list: "+next_list);
        // console.log($("#list"+6));
        if ($("#list"+next_list).length > 0) {
            // console.log("clearing #list"+start_list);
            clear_list(start_list, true);
            // console.log("cleared list "+start_list+" and added option");
            // console.log("next list: "+next_list);
            clear_lists(next_list);
        } else {
            clear_list(start_list, false);
            // console.log("cleared list "+start_list+" and didn't add option");
        }
    }

    function set_options_list(which_list, items) {
        // clear_lists(which_list);
        _.map(items, function(item) {
  
            // var list_item = document.createElement("li");
            var option = document.createElement("option");
            $(option).addClass("item-button"+which_list).html(item[0]);
            $(option).data("items", item[1]);
            
            $("#list"+which_list).on("change", function() {
                var selectedOption = $("option:selected", this);
                set_list_generic(which_list+1, $(selectedOption).data("items"));
        });
  
        // $(list_item).html($(button))
        $("#list"+which_list).append(option);
      });
    }

    function set_li_list(which_list, items) {
        // $("#list"+which_list).empty();
        console.log(items);
        _.map(items, function (item) {
            var element = document.createElement("li");
            $(element).html(item);
            $("#list"+which_list).append(element);
            var description_elm = document.createElement("div");
            var descriptions = get_description(item);
            descriptions.forEach(function (description) {
                $(description_elm).append(description);
                $(description_elm).append("<br>")
            })
            $("#list"+which_list).append(description_elm);
        });
    }

    function set_list_generic(which_list, items) {
        if (items.length === 0) {
            return;
        }
        clear_lists(which_list);
        if (Array.isArray(items[0])) {
            // console.log("setting list "+which_list);
            set_options_list(which_list, items);
        }
        else {
            // console.log("setting final list");
            set_li_list(which_list, items);
        }
    }
  
    function get_description(text) {
        var descriptions = [];
        Object.keys(capsid_descriptions).forEach(function (capsid) {
            if (text.toLowerCase().includes(capsid.toLowerCase())) {
                capsid_descriptions[capsid].forEach(function (description) {
                    var new_link = document.createElement("a");
                    // console.log($(new_link));
                    // if ($(new_link)) {
                    //     console.log("exists")
                    // }
                    new_link.setAttribute("href", description[1]);
                    $(new_link).html(description[0]);
                    descriptions.push(new_link);
                    // descriptions.push(description);
                });
            }
        });
        // console.log(descriptions)
        return descriptions;
    }

    $("#clear").on("click", function() {
        $(".item-button1").css("background-color", "white");
        var first_list = 1;
        clear_lists(first_list);
        set_list_generic(first_list, capsid_selections)

    });

    set_list_generic(1, capsid_selections);
    // console.log($("#list1"));
  
  });

/*

dictionary:
capsid_descriptions = {
  "name of capsid": "description",
  "next capsid": "next description",
}

*/

/*

a = []
for capsid in capsid_descriptions.keys():
  if text.lower().contains(capsid.lower()):
    a.append(capsid_descriptions[capsid])
return " ".join(a)

*/