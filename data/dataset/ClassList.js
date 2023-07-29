Aria.classDefinition({
    $classpath : "test.aria.utils.ClassList",
    $extends : "aria.jsunit.TestCase",
    $dependencies : ["aria.utils.ClassList"],
    $prototype : {
        setUp : function () {
            var document = Aria.$window.document;
            var testArea = document.createElement("div");

            testArea.id = "testDiv";
            document.body.appendChild(testArea);
            this.playgroundTestArea = testArea;

            this.classList = new aria.utils.ClassList(this.playgroundTestArea);
        },

        tearDown : function () {
            this.playgroundTestArea.parentNode.removeChild(this.playgroundTestArea);
            this.playgroundTestArea = null;
            this.classList.$dispose();
        },

        testAddAndRemoveClass : function () {
            this.classList.add("testClass");
            this.assertEquals(this.classList.getClassName(), "testClass", "The class was not added to the html element");

            this.classList.add("testClass2 testClass3");
            this.assertEquals(this.classList.getClassName(), "testClass testClass2 testClass3", "The 2 classes were not added to the html element");

            var array = ["testClass4", "testClass5", "testClass6"];
            this.classList.add(array);
            this.assertEquals(this.classList.getClassName(), "testClass testClass2 testClass3 testClass4 testClass5 testClass6", "The array of classes was not added to the html element");

            this.classList.remove("testClass");
            this.assertEquals(this.classList.getClassName(), "testClass2 testClass3 testClass4 testClass5 testClass6", "The array of classes was not removed to the html element");

            this.classList.remove("testClass2 testClass3");
            this.assertEquals(this.classList.getClassName(), "testClass4 testClass5 testClass6", "The classes were not removed to the html element");

            this.classList.remove(array);
            this.assertEquals(this.classList.getClassName(), "", "The class was not removed to the html element");

            this.classList.add("classA classB");
            this.classList.add("classA");
            this.assertEquals(this.classList.getClassName(), "classB classA", "The className should not have duplicates");

            this.classList.add("");
            this.assertEquals(this.classList.getClassName(), "classB classA", "The method should not add empty classes");

            this.classList.remove("brasil");
            this.assertEquals(this.classList.getClassName(), "classB classA");

            this.classList.setClassName("  testClass    testClass2  ");
            this.classList.add("testClass3");
            this.assertEquals(this.classList.getClassName(), "testClass testClass2 testClass3");
        }
    }
});
