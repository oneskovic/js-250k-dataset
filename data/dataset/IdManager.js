/**
 * Test case for aria.utils.Delegate
 */
Aria.classDefinition({
    $classpath : "test.aria.utils.IdManager",
    $extends : "aria.jsunit.TestCase",
    $dependencies : ["aria.utils.IdManager", "aria.utils.Array"],
    $prototype : {

        /**
         * Test IdManager with simple complete use case
         */
        test_getId : function () {

            var nbToCreate = 50;
            var idMgr1 = new aria.utils.IdManager(), idMgr2 = new aria.utils.IdManager("test"), i, contains;

            var pool1 = [], pool1Copy = [];
            for (i = 0; i < nbToCreate; i++) {
                var id = idMgr1.getId();
                pool1.push(id);
                pool1Copy.push(id);
            }

            var pool2 = [];
            for (i = 0; i < nbToCreate; i++) {
                pool2.push(idMgr2.getId());
            }

            // test unicity inside pool
            contains = false;
            for (i = 0; i < nbToCreate; i++) {
                var id = pool1[i];
                pool1[i] = null;
                contains = contains || aria.utils.Array.contains(pool1, id);
                pool1[i] = id;
            }

            this.assertFalse(contains, "Id is not unique.");

            // test unicity guaranteed by prefixing
            contains = false;
            for (i = 0; i < nbToCreate; i++) {
                contains = contains || aria.utils.Array.contains(pool2, pool1[i]);
            }
            this.assertFalse(contains, "Prefixing failed.");

            // release and recreate
            for (i = 0; i < nbToCreate; i++) {
                idMgr1.releaseId(pool1[i]);
                // release twice, should not fail
                idMgr1.releaseId(pool1[i]);
                idMgr1.releaseId(pool1[i]);
            }

            var pool1 = [];
            for (i = 0; i < nbToCreate; i++) {
                pool1.push(idMgr1.getId());
            }

            // test that ids are reused
            contains = true;
            for (i = 0; i < nbToCreate; i++) {
                contains = contains && aria.utils.Array.contains(pool1, pool1Copy[i]);
            }

            this.assertTrue(contains, "ids not reused");

            idMgr1.$dispose();
            idMgr2.$dispose();

        }

    }
});
