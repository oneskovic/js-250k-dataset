describe("honeypot", function () {
    var honeypot = require('ripple/honeypot');

    describe("when monitoring", function () {
        describe("with andReturn", function () {
            it("doesn't create the property before accessed", function () {
                var foo = {};
                honeypot.monitor(foo, "bar").andReturn("mine");
                expect(foo.bar).not.toBeDefined();
            });

            it("returns the value rather than what was set", function () {
                var orange = {};
                honeypot.monitor(orange, "lantern").andReturn("mine");
                orange.lantern = "oath";
                expect(orange.lantern).toBe("mine");
            });
        });

        describe("with andRun", function () {
            it("doesn't create the property before accessed", function () {
                var foo = {},
                    get = jasmine.createSpy().andReturn("asdf");
                honeypot.monitor(foo, "bar").andRun(get);

                expect(get).not.toHaveBeenCalled();
                expect(foo.bar).not.toBeDefined();
            });

            it("runs the get function when accessing", function () {
                var eat = {},
                    love = jasmine.createSpy("get func").andReturn("love");

                honeypot.monitor(eat, "pray").andRun(love);
                eat.pray = "and write a book";
                expect(eat.pray).toBe("love");
                expect(love).toHaveBeenCalled();
            });

            it("runs the set function when setting", function () {
                var dude = {},
                    sweet = jasmine.createSpy("set func");

                honeypot.monitor(dude, "sweet").andRun(jasmine.createSpy(), sweet);
                expect(sweet).not.toHaveBeenCalled();
                dude.sweet = "asdf";

                expect(sweet).toHaveBeenCalledWith("asdf");
            });
        });
    });
});
