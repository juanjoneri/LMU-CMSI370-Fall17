"use strict";

(() => {
    window.GiphySearchController = {
        init: () => {
            let searchButton = $("#search-button");
            let searchTerm = $("#search-term");
            let imageResultContainer = $(".image-result-container");

            searchButton.click(() =>
                $.getJSON("http://api.giphy.com/v1/gifs/search", {
                    rating: "pg-13",
                    q: searchTerm.val(),
                    api_key: "dc6zaTOxFJmzC"
                }).done(result => imageResultContainer.empty().append(
                    result.data.map(image => $("<div></div>").addClass("col-xs-2").append(
                        $("<img/>").attr({ src: image.images.fixed_width.url, alt: image.source_tld })
                    ))
                ))
            );

            searchTerm.bind("input", () => searchButton.prop("disabled", !searchTerm.val()));
        }
    };
})();
