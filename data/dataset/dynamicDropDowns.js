function addDropDown() {
	// Create the element just like you would in a normal screen declaration
	var option,
		dropDown = document.createElement('select');
	dropDown.setAttribute('data-bb-label','Delete Me?');
	
	// Create our options for the select
	option = document.createElement('option');
	option.setAttribute('value','1');
	option.setAttribute('selected','true');
	option.innerHTML = 'No';
	dropDown.appendChild(option);
	option = document.createElement('option');
	option.setAttribute('value','2');
	option.innerHTML = 'Yes';
	dropDown.appendChild(option);
	
	// Assign our change handler
	dropDown.onchange = function() {
			if (this.value == 2) {
				this.remove();
			} 
		};
		
	// Apply our styling
	dropDown = bb.dropdown.style(dropDown);
	
	// Insert it into the screen and update the scroller
	document.getElementById('dropdownContainer').appendChild(dropDown);
	bb.refresh();
}

function addDropDownOption() {
	// Find out dropdown and add a new option
	var dropdown = document.getElementById('refreshTarget'),
		count = dropdown.options.length + 1,
		option = document.createElement('option');
	option.setAttribute('value',count);
	option.innerHTML = count;
	dropdown.appendChild(option);
	
	// Refresh the dropdown
	dropdown.refresh();
}

  
