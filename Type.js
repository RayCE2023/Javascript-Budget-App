var Expense = function(id, desc, val){
  this.id = id;
  this.desc = desc;
  this.val = val;
  this.pct = -1;
};

Expense.prototype.calcPercentage = function(totalInc){
  if (totalInc > 0) {
      this.pct = Math.round((this.val / totalInc) * 100);
  } else {
      this.pct = -1;
  }
};

Expense.prototype.getPercentage = function() {
    return this.pct;
};

var Income = function(id, desc, val) {
    this.id = id;
    this.desc = desc;
    this.val = val;
};
