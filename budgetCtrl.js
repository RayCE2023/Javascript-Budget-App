var budgetController = (function() {

  var data = {
      allItems: {
          exp: [],
          inc: []
      },
      totals: {
          exp: 0,
          inc: 0
      },
      budget: 0,
      pct: -1
  };

  var calTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(cur) {
          sum += cur.val;
      });
      data.totals[type] = sum;
  };

  return {

    getBudget: function() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.pct
        };
    },

    calBudget: function() {
        // calculate total income and expenses
        calTotal('exp');
        calTotal('inc');

        // Calculate the budget
        data.budget = data.totals.inc - data.totals.exp;

        // calculate the percentage of income
        if (data.totals.inc > 0) {
            data.pct = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.pct = -1;
        }
    },

    getExpPcts: function() {
      //return array of pcts for expense
        var allPerc = data.allItems.exp.map(function(cur) {
            return cur.getPercentage();
        });
        return allPerc;
    },

    calExpPcts: function() {

        data.allItems.exp.forEach(function(cur) {
           cur.calcPercentage(data.totals.inc);
        });
    },

    add: function(type, des, val) {
        var item, ID;

        // Create new ID
        if (data.allItems[type].length > 0) {
            // ID = last ID + 1
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }
        // Create new item based on 'inc' or 'exp' type
        if (type === 'exp') {
            item = new Expense(ID, des, val);
        } else if (type === 'inc') {
            item = new Income(ID, des, val);
        }
        // add item to data
        data.allItems[type].push(item);

        return item;
    },

    del: function(type, id) {
        var IDs, indexToDel;

        IDs = data.allItems[type].map(function(i) {
            return i.id;
        });

        indexToDel = IDs.indexOf(id);

        if (indexToDel !== -1) {
            data.allItems[type].splice(indexToDel, 1);
        }
    }
  };
})();
