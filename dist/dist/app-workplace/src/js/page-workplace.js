window.onload = function() {
  var db = new mljs();
  db.logger.setLogLevel("debug");

  var errors = new com.marklogic.widgets.error("errors");
  errors.showFirstCodefile = true;
  errors.allowDetails = true;

  try {
    // Load workplace nav bar
    var wpcontext = new com.marklogic.widgets.workplacecontext();
    var nav = new com.marklogic.widgets.workplacenavbar("navholder");
    wpcontext.register(nav);
    wpcontext.loadMyPages();

    // Load the current page configuration

        var workplace = new com.marklogic.widgets.workplace("workplace");
        wpcontext.register(workplace);

        //workplace.editable(); - edited via link on top right of page instead
        //workplace.saveable(false); // don't persist changes
        // NB first below is "try this first, then default to second"
        var pageurl = window.location.pathname; // TODO validate this works in all browsers

        var pc = new com.marklogic.widgets.pagecontext();
        pc.setWorkplaceWidget(workplace);
        wpcontext.register(pc); // will call _parse when page loads

        workplace.loadPage(pageurl); // could instead use loadPage() to determine automatically via window.location, or loadPage("/my/path") to load via search in content database
        // TODO use context instead of widget above
        
  } catch (err) {
    errors.show(err);
  }

};