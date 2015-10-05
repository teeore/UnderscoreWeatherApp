var weatherFn = {
    init: function() {
        var weatherItems;
        $('#getData').submit(function() {
            weatherFn.getWeather();
            return false;
        });
    },

    getWeather: function(data) {
        var urlPrefix;

        //get form input
        var input = {
            "searchTerm": $('#searchTerm').val(),
            "forecast": parseInt($('#forecast').val(), 10)
        };

        //set ajax params dynamically
        var param = {
            type: 'POST',
            dataType: 'json'
        };

        // set url depending on forecast value
        //test if input is zip or city
        var reg = new RegExp("^\\d{5}(-\\d{4})?$");
        
        var apiKey = 'apikey=7c4ec5e58cb8837e541fa0d74149e860';
        if (input.forecast === 1) {
            if (input.searchTerm && reg.test(input.searchTerm)) {
            urlPrefix = 'http://api.openweathermap.org/data/2.5/weather?zip=';
        } else {
            urlPrefix = 'http://api.openweathermap.org/data/2.5/weather?q=';
        }
            param.url = urlPrefix + input.searchTerm + '&units=imperial&' + apiKey;
        } else {
            if (input.searchTerm && reg.test(input.searchTerm)) {
            urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
        } else {
            urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        }
            param.url = urlPrefix + input.searchTerm + '&units=imperial&cnt=' + input.forecast + '&' + apiKey;
        }

        param.success = function(data) {
            weatherItems = data;

            //call template based on forecast
            if (input.forecast == 1) {
                weatherFn.updateSingleView();
                console.log(weatherItems);

            } else {
                weatherFn.updateMultipleView();
                console.log(weatherItems);
            }
        }
        $.ajax(param);
    },

    updateSingleView: function() {
        var singleTemplate = _.template($("#single-template").html());
        htmlTmpl = singleTemplate(weatherItems);
        $(".wrapper").html(htmlTmpl).show();
    },

    updateMultipleView: function() {
        var multipleTemplate = _.template($("#multiple-template").html());
        htmlTmpl = multipleTemplate(weatherItems);
        $(".wrapper").html(htmlTmpl);
    }

};

$(document).ready(function() {
    weatherFn.init();
});
