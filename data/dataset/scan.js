var libnmap = require('../')
  , timeout = 1024 * 1024 * 2
  , chai = require('chai')
  , should = chai.should()
  , expect = chai.expect

describe('nmap', function(){

  describe('scan method', function(){
    it('valid report', function(done){
      this.timeout(timeout)

      var opts = {
        range: ['localhost'],
        ports: '1-1024'
      }

      libnmap.nmap('scan', opts, function(err, report){
        should.not.exist(err)

        report.should.be.a('array')
        report[0].should.be.a('array')
        report[0][0].should.be.a('object')

        should.exist(report[0][0].ip)
        should.exist(report[0][0].ports)

        done()
      })
    })
  })
})
