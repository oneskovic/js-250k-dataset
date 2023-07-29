qx.Class.define("qx.test.EditDistance",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    assertTransform : function(strA, strB)
    {
      var arrA = qx.lang.String.toArray(strA);
      var arrB = qx.lang.String.toArray(strB);
      var job;

      var operations = qx.util.EditDistance.getEditOperations(arrA, arrB);

      for (var i=0, l=operations.length; i<l; i++)
      {
        job = operations[i];

        switch(job.operation)
        {
          case qx.util.EditDistance.OPERATION_DELETE:
            qx.lang.Array.removeAt(arrA, job.pos);
            break;

          case qx.util.EditDistance.OPERATION_REPLACE:
            arrA[job.pos] = job.value;
            break;

          case qx.util.EditDistance.OPERATION_INSERT:
            qx.lang.Array.insertAt(arrA, job.value, job.pos);
            break;

          default:
            throw new Error("Invalid operation: " + job.operation);
        }
      }

      var result = arrA.join("");

      if (result !== strB) {
        throw new Error("Implementation could not transform: " + strA + " to " + strB + "! Result was: " + result);
      }

      // this.debug("Successfully transformed: " + strA + " to " + strB + ".");
    },


    testBasics : function()
    {
      this.assertTransform("hello world", "hallo welt");
      this.assertTransform("abcdef", "abdcef");
      this.assertTransform("abcdef", "fedcba");
      this.assertTransform("abcdef", "abc");
      this.assertTransform("abcdef", "def");
      this.assertTransform("abcdef", "bcef");
      this.assertTransform("abcdef", "abcghi");
      this.assertTransform("abcdef", "abcstudef");
    }
  }
});
