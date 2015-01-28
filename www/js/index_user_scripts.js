(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
        
        $(document).on("click", ".uib_w_10", function(evt)
        {
            searchMake();
        });
        $(document).on("click", ".uib_w_17", function(evt)
        {
            history.back();
        });
//        $(document).on("click", "recentbox.text()", function(evt)
//        {
//            window.open("http://www.edmunds.com/volkswagen/tiguan/2010/consumer-reviews/review.html?style=101204317&reviewId=794778859");    
//        });
}
 $(document).ready(register_event_handlers);
})();
