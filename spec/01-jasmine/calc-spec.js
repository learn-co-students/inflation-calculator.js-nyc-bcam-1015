'use-strict';
describe('Inflation Calculator', function() {
  beforeEach(function(){
    setFixtures('<body><div class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><h1>Inflation Calculator</h1><div class="form-group"><label for="startDate">Start Date</label><input type="text" class="form-control" id="startDate" placeholder="2012/1/1"></div><div class="form-group"><label for="endDate">End Date</label><input type="text" class="form-control" id="endDate" placeholder="2012/12/1"></div><div class="form-group"><label class="sr-only" for="startPrice">Start price</label><div class="input-group"><div class="input-group-addon">$</div><input type="text" class="form-control" id="startPrice" placeholder="100"></div></div><button class="btn btn-default" id="calc">Calculate</button><br><br><div class="form-group"><label class="sr-only" for="endPrice">End price</label><div class="input-group"><div class="input-group-addon">$</div><input type="text" class="form-control" id="endPrice"></div></div></div><!-- col-md-4 col-md-offset-4 --></div><!-- row --> </div><!-- container --></body>');
  });

  describe('fetchUserInput()', function() {
    it('returns an object', function() {
      $('#startDate').val('2012/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(100);
      var options = fetchUserInput();
      expect(options).toEqual(jasmine.any(Object));
    });
   it('returns object with three properties: start, end, and amount', function() {
      $('#startDate').val('2012/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(100);
      var result = fetchUserInput();
      expect(result.start).not.toBeUndefined();
      expect(result.end).not.toBeUndefined();
      expect(result.amount).not.toBeUndefined();
    });
    it('return value has correct start, end, and amount values', function() {
      $('#startDate').val('2012/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(100);
      var result = fetchUserInput();
      expect(result.start).toMatch('2012/01/01'); 
      expect(result.end).toMatch('2012/12/01');
      expect(result.amount).toMatch(100);
    });
    it("doesn't hard code the start, end, and amount values", function() {
      $('#startDate').val('2010/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(355);
      var result = fetchUserInput();
      expect(result.start).toMatch('2010/01/01'); 
      expect(result.end).toMatch('2012/12/01');
      expect(result.amount).toMatch(355);
    });
  });

  describe('addPriceToPage()', function() {
    it('returns the parameter without the dollar sign', function() {
      var result = addPriceToPage("$765.01");
      expect(result).toMatch("765.01")
      expect(result).not.toMatch("$765.01")
    });
    it("adds the parameter minus the '$' to the 'endPrice' input when passed '$765.01'", function() {
      addPriceToPage("$765.01");
      expect($('#endPrice').val()).toEqual("765.01");
    });
    it("adds the parameter minus the '$' to the 'endPrice' input when passed '$435.53'", function() {
      addPriceToPage("$765.01");
      expect($('#endPrice').val()).toEqual("765.01");
    });
  });

  describe('fetchEndPrice()', function() {
    it("passes the return of fetchUserInput() as the first param to priceFor()", function() {
      function fetchUserInput() {
        return { start:'2010/01/01', end:'2012/12/01', amount:'355' };
      }
      function priceFor(param1, param2) {
        var options = fetchUserInput();
        expect(param1).toEqual(options);
      }
      function callback(val) { done(); }
      fetchEndPrice(callback);
    });
    it("gives the callback it's passed as a parameter as the second params to priceFor()", function() {
      function fetchUserInput() {
        return { start:'2010/01/01', end:'2012/12/01', amount:'355' };
      }
      function priceFor(param1, param2) {
        expect(param2).toEqual(callback);
      }
      function callback(val) { return "this is a callback"; }
      fetchEndPrice(callback);
    });
    it("adds the adjusted price to '#endPrice' for two dates in 2012 and $100", function() {
      spyOn($, 'ajax').and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve("$101.00");
        return d.promise();
      });
      $('#startDate').val('2012/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val('100');
      fetchEndPrice(addPriceToPage);
      expect($('#endPrice').val()).toEqual("101.00");
    });
    it("adds the adjusted price to '#endPrice' for one date in 2009, one in 2012, and $200", function() {
      spyOn($, 'ajax').and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve("$218.43");
        return d.promise();
      });
      $('#startDate').val('2009/01/01');
      $('#endDate').val('2012/12/31');
      $('#startPrice').val('200');
      fetchEndPrice(addPriceToPage);
      expect($('#endPrice').val()).toEqual("218.43");
    });
  });
});
