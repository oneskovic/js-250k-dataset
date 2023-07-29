({
    /* checked checkbox */
    testChecked: {
        attributes : {value : true},
        test: function(component){
        	var expectedElem = component.find("img1").getElement().getElementsByTagName("img")[0];
            aura.test.assertTrue($A.util.hasClass(expectedElem, "checked"), "missing class: checked");
        }
    },

    /* unchecked checkbox */
    testUnchecked: {
        attributes : {value : false},
        test: function(component){
            var expectedElem = component.find("img1").getElement().getElementsByTagName("img")[0];
            aura.test.assertTrue($A.util.hasClass(expectedElem, "unchecked"), "missing class: unchecked");
        }
    },

    /* unchecked -> checked checkbox */
    testRerenderChecked: {
        attributes : {value : false},
        test: [function(component){
            var expectedElem = component.find("img1").getElement().getElementsByTagName("img")[0];
            aura.test.assertTrue($A.util.hasClass(expectedElem, "unchecked"), "missing class: unchecked");

            component.set("v.value",true);
        }, function(component){
            var expectedElem = component.find("img1").getElement().getElementsByTagName("img")[0];
            aura.test.assertTrue($A.util.hasClass(expectedElem, "checked"), "missing class: checked");
        }]
    },

    /* checked -> unchecked checkbox */
    testRerenderUnchecked: {
        attributes : {value : true},
        test: [function(component){
            var expectedElem = component.find("img1").getElement().getElementsByTagName("img")[0];
            aura.test.assertTrue($A.util.hasClass(expectedElem, "checked"), "missing class: checked");

            component.set("v.value",false);
        }, function(component){
            var expectedElem = component.find("img1").getElement().getElementsByTagName("img")[0];
            aura.test.assertTrue($A.util.hasClass(expectedElem, "unchecked"), "missing class: unchecked");
      }]
    }
})
