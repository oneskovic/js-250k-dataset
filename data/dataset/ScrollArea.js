function CreateScrollArea(scrollAreaID, spec)
{
	var scrollAreaElement = document.getElementById(scrollAreaID);
	
	if (!scrollAreaElement.loaded) {
		var element = null;
		var style = null;
		var contentElement = null;
		var verticalScrollbar = null;
		var horizontalScrollbar = null;
		var hasVerticalScrollbar = spec.hasVerticalScrollbar == undefined ? false : spec.hasVerticalScrollbar;
		var hasHorizontalScrollbar = spec.hasHorizontalScrollbar == undefined ? false : spec.hasHorizontalScrollbar;
		var autoHideScrollbars = spec.autoHideScrollbars == undefined ? false : spec.autoHideScrollbars;
		var leftMargin = spec.leftMargin == undefined ? 0 : spec.leftMargin;
		var rightMargin = spec.rightMargin == undefined ? 0 : spec.rightMargin;
		var topMargin = spec.topMargin == undefined ? 0 : spec.topMargin;
		var bottomMargin = spec.bottomMargin == undefined ? 0 : spec.bottomMargin;
        var scrollbarMargin = spec.scrollbarMargin == undefined ? 0 : spec.scrollbarMargin;;
        var leftScrollbarMargin = leftMargin + scrollbarMargin;
        var rightScrollbarMargin = rightMargin + scrollbarMargin;
		var topScrollbarMargin = topMargin + scrollbarMargin;
		var bottomScrollbarMargin = bottomMargin + scrollbarMargin;
		var spacing = spec.spacing == undefined ? 0 : spec.spacing;
		var scrollbarSize = spec.scrollbarDivSize == undefined ? 0 : spec.scrollbarDivSize;;
		
		// Associate or create the content area element
		if (scrollAreaElement.childNodes.length > 1) {
			contentElement = scrollAreaElement.childNodes[1];
		}
		if (contentElement == null || contentElement == undefined) {
			contentElement = document.createElement("div");
		}
		style = contentElement.style;
		style.position = "absolute";
		style.left = leftMargin + "px";
		style.top = topMargin + "px";
		
		if (hasVerticalScrollbar && hasHorizontalScrollbar) {
			style.right = rightMargin + scrollbarSize + spacing + "px";
			style.bottom = bottomMargin + scrollbarSize + spacing + "px";
		} else if (hasVerticalScrollbar) {
			style.right = rightMargin + scrollbarSize + spacing + "px";
			style.bottom = bottomMargin + "px";
		} else if (hasHorizontalScrollbar) {
			style.right = rightMargin + "px";
			style.bottom = bottomMargin + scrollbarSize + spacing + "px";
		} else {
			style.right = rightMargin + "px";
			style.bottom = bottomMargin + "px";
		}
		scrollAreaElement.appendChild(contentElement);
		scrollAreaElement.contentElement = contentElement;
		scrollAreaElement.content = contentElement;
		
		// Create the vertical scroll bar
		if (hasVerticalScrollbar) {
			element = document.createElement("div");
			element.className = "apple-no-children apple-remove";
			style = element.style;
			style.position = "absolute";
			style.width = scrollbarSize + "px";
			style.height = "auto";
			style.right = rightMargin + "px";
			style.top = topScrollbarMargin + "px";
			style.bottom = hasHorizontalScrollbar ? bottomScrollbarMargin + scrollbarSize + "px" : bottomScrollbarMargin + "px";
			style.appleDashboardRegion = "none";
			scrollAreaElement.appendChild(element);
			verticalScrollbar = new AppleVerticalScrollbar(element);			
			scrollAreaElement.verticalScrollbarElement = element;
		}

		// Create the horizontal scroll bar
		if (hasHorizontalScrollbar) {
			element = document.createElement("div");
			element.className = "apple-no-children apple-remove";
			style = element.style;
			style.position = "absolute";
			style.width = "auto";
			style.height = scrollbarSize + "px";
			style.left = leftScrollbarMargin + "px";
			style.right = hasVerticalScrollbar ? rightScrollbarMargin + scrollbarSize + "px" : rightScrollbarMargin + "px";
			style.bottom = bottomMargin + "px";
			style.appleDashboardRegion = "none";
			scrollAreaElement.appendChild(element);
			horizontalScrollbar = new AppleHorizontalScrollbar(element);
			scrollAreaElement.horizontalScrollbarElement = element;
		}
		
		// Create the scroll area
		if (hasVerticalScrollbar && hasHorizontalScrollbar) {
			scrollAreaElement.object = new AppleScrollArea(contentElement, verticalScrollbar, horizontalScrollbar);
		} else if (hasVerticalScrollbar) {
			scrollAreaElement.object = new AppleScrollArea(contentElement, verticalScrollbar);
		} else if (hasHorizontalScrollbar) {
			scrollAreaElement.object = new AppleScrollArea(contentElement, horizontalScrollbar);
		} else {
			scrollAreaElement.object = new AppleScrollArea(contentElement);
		}

		// Adjust the auto hide setting
		if (verticalScrollbar) {
			verticalScrollbar.setAutohide(autoHideScrollbars);
		}
		if (horizontalScrollbar) {
			horizontalScrollbar.setAutohide(autoHideScrollbars);
		}
		
		scrollAreaElement.object.contentElement = contentElement;
		scrollAreaElement.object.content = contentElement;
		scrollAreaElement.object.refresh();
	}
	
	return scrollAreaElement.object;
}
