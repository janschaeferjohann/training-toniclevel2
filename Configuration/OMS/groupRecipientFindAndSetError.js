/**
 * This script detects error of current document and sets state of documents belonging to same group 
 * to WAIT_FOR_STACK_PROCESSING
 * 
 * groupName: this is group of stack, which should keep the error state
 * groupState: this can also be used to set the state of group to 1 (WAIT_FOR_STACK_PROCESSING)
 * 
 * Group should be configured to be processed in same parallel stack!!
 * 
 */

var groupName = "Recipient";
var groupState = "3"; // ERROR_IN_STACK_PROCESSING
//var groupState = "1"; // normally WAIT_FOR_STACK_PROCESSING
var groupChangeMonitor = ctx.getGroupChangeMonitor(groupName);
var currentPosition = ctx.getActualProcessingPosition();
var isErrored = ctx.isDocumentStatusError() || ctx.getParameter(groupName + "_ISERRORED") == "TRUE";
// group is changing and group needs lookup, if following document in group has error
if (groupChangeMonitor.isFirstDocOfGroup(currentPosition) && groupChangeMonitor.getGroupDocumentCount(currentPosition) > 1) {
	// Look ahead if any document in group is in state ERROR_IN_STACK_PROCESSING
	var followingDocumentPosition = currentPosition;
	isErrored = ctx.isDocumentStatusError();
	while(!isErrored && !groupChangeMonitor.isLastDocOfGroup(followingDocumentPosition)) {
		followingDocumentPosition++;
		var state = ctx.getParameterValueROAccess(followingDocumentPosition).getParameterStrValue("KW_STATUS");
		if (state == "3" /* ERROR_IN_STACK_PROCESSING */) {
			isErrored = true;
		}
	}
	ctx.putParameter(groupName + "_ISERRORED", isErrored ? "TRUE" : "FALSE");
}
// Set state if group is errored
if (ctx.isDocumentStatusError() || isErrored) {
	ctx.getParameterValueRWAccess().setParameterStrValue("KW_STATUS", groupState); 	
}
