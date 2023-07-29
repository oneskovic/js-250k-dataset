define(function(require){
    var expect = chai.expect;
    
    describe('Runtime ua测试', function () {
            beforeEach(function () {
                console.log(this);
            });
            before(function () {
                console.log(this);
            });
            afterEach(function () {
                console.log(this);
            });
            after(function () {
                console.log(this);
            });
            var ua = navigator.userAgent;
            it('ua含有BlendUI', function () {
                expect(ua).to.match(/BlendUI/);
            });

            it('ua含有BaiduLightAppRuntime', function () {
                expect(ua).to.match(/BaiduLightAppRuntime/);
            });

            it('Runtime版本号是4位', function () {
                var _v = ua.match(/BaiduLightAppRuntime\/([^\s]+)/)[1];
                var _v = _v.split('.');
                expect(_v).to.have.length(4);
            });

            it('Runtime版本是否大于2.4', function () {
                var _v = ua.match(/BaiduLightAppRuntime\/([^\s]+)/);
                expect(parseFloat(_v[1])).to.be.greaterThan(2.4);
            });
    });

});