(function($) {

    $(function() {
        function hideShow(condition) {
            return condition ? 'hide' : 'show'
        }
        $('#article-filter').on('keyup', function() {
            var txt = $(this).val().toLowerCase();
            $('ul#article-list > li').each(function() {
                var allItems = $('ul li', this);
                var visibleItems = allItems.filter(function(index, elem) {
                    return $(elem).text().toLowerCase().indexOf(txt) !== -1;
                });
                visibleItems.show();
                allItems.not(visibleItems).hide();
                $(this)[hideShow(visibleItems.length === 0)]();
            });
            $('#no-search-results')[hideShow($('ul#article-list li:visible').length > 0)]();
        });


        $('#side-nav-menu').click(function() {
            $('#secondary').toggleClass('onCanvas');
        });
        $('main').click(function(e) {
            if ($('#secondary').hasClass('onCanvas')) {
                $('#secondary').toggleClass('onCanvas');
                e.preventDefault();
            }
        });

    function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

        var curItem = $('ul#article-list .current');
        if (curItem && curItem.length) {
            var curCat = curItem.closest('ul#article-list > li');
            var nextCat = curCat.next();
            var nextViewItem = $('ul li', nextCat).first();
            var headerItem = $('h2', curCat);

            if (nextViewItem && nextViewItem.length) {
                if (!isElementInViewport(nextViewItem)) {
                    nextViewItem[0].scrollIntoView(false);
                }
            } else {
                headerItem[0].scrollIntoView();
            }
        }
    /* put this back when Lars changes his mind

    var curItem = $('ul#article-list .current').siblings().andSelf().last();
        if (curItem && curItem.length && !isElementInViewport(curItem)) {

            var headerItem = $('h2', curItem.closest('ul#article-list > li'));

            if ($('ul#article-list > li > h2').last().get(0) === headerItem.get(0)) {
                headerItem[0].scrollIntoView();
            } else {
                curItem[0].scrollIntoView(false);
            }
        }
    */
        $('ul#article-list').css('visibility', 'visible');
    });

})( jQuery );
