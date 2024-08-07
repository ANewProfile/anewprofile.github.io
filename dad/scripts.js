
// IMPORTANT: consult these docs
// lodash: https://lodash.com/docs/4.17.15
// jquery: https://api.jquery.com/

$(document).ready(function() {

    function clear_list_in_container(list_container) {
        var list = $(".list:first", list_container)[0];
        var next_list_container = $(".list-container:first", list_container)[0];

        $(list).empty();

        if (next_list_container !== undefined) {
          $(list).append("<option value='-' selected disabled>Choose an option</option>");
          clear_list_in_container(next_list_container);
        }
    }
  
    function set_options_list(list_container, list_items) {
        clear_list_in_container(list_container);

        var list = $(".list:first", list_container)[0];
        var next_list_container = $(".list-container:first", list_container)[0];

        _.map(list_items, function(item) {
            var option = document.createElement("option");
            $(option).addClass("item-button1").html(item[0]);
            $(option).data("items", item[1]);
            $(list).append(option);
        });
        $(list).on('change', function (e) {
            var optionSelected = $("option:selected", this);
            set_list_generic($(next_list_container), $(optionSelected).data("items"));
        });
    }

    function set_final_list(list_container, list_items) {
        clear_list_in_container(list_container);

        var list = $(".list:first", list_container)[0];

        _.map(list_items, function(item) {
            var p = document.createElement("p");
            $(p).html(item);
            list.append(p);
        });
    }

    function set_list_generic(list_container, list_items) {
        list_container.show();
        if (list_items.length == 0) {
          return;
        }
        if (Array.isArray(list_items[0])) {
          set_options_list(list_container, list_items);
        }
        else {
          set_final_list(list_container, list_items);
        }
    }

    function reset() {
      $("#list1").hide();
      set_list_generic($("#list1"), capsid_selections);
    }

    $("#clear").on("click", reset);
    reset();

});
