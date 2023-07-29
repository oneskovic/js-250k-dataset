/**
 *	Get and set properties on a XPCOM object and verify that they are
 *  JavaScripty.
 *
 */

StartTest( "Get and Set Properties on a native object" );
SetupTest();
AddTestData();
StopTest();

function SetupTest() {
	CONTRACTID = "@mozilla.org/js/xpc/test/Overloaded;1";
	CLASS = Components.classes[CONTRACTID].createInstance();
	IFACE = Components.interfaces.nsIXPCTestScriptable;

	testObject = CLASS.QueryInterface(IFACE);
}

function AddTestData() {
	// add a property to the object.

	testObject.newProperty = "PASS",
	AddTestCase(
	"testObject.newProperty = \"PASS\"; testObject.newProperty",
	"PASS",
	testObject.newProperty );

	// delete a property from an object
	var result = delete testObject.newProperty;
	
	AddTestCase(
		"delete testObject.newProperty",
		true,
		result );
	AddTestCase(
		"delete testObject.newProperty; testObject.newProperty",
		undefined,
		testObject.newProperty );

	// add a function

	testObject.newFunction = new Function( "return \"PASSED\"" );
	
	AddTestCase(
		"testObject.newFunction = new Function(\"return 'PASSED'\"); " +
		"typeof testObject.newFunction",
		"function",
		typeof testObject.newFunction );

	var s = "testObject.newFunction()"

	AddTestCase(
		"testObject.newFunction()",
		"PASSED",
		eval(s));

	// try to call the function as a constructor
	testObject.newFunction = new Function( "this.result = \"PASSED\"" );

	AddTestCase( 
		"testObject.newFunction = new Function( 'this.result = \"PASSED\"'); "+
		"new testObject.newFunction().result",
		"PASSED",
		new testObject.newFunction().result );


	// delete the function

	result = delete testObject.newFunction;
	AddTestCase(
		"delete testObject.newFunction",
		true,
		result);

	AddTestCase(
		"typeof testObject.newFunction",
		"undefined",
		typeof testObject.newFunction);

}
