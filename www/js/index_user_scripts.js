(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    checkKeyValidity();
        
        $(document).on("click", ".uib_w_5", function(evt)
        {
          search();
        });
}
 $(document).ready(register_event_handlers);
})();
