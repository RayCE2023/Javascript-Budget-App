var UIController = (function() {

  var DOMstrings = {
      inputType: '.add__type',
      inputDesc: '.add__description',
      inputVal: '.add__value',
      inputBtn: '.add__btn',
      incContainer: '.income__list',
      expContainer: '.expenses__list',
      budgetLabel: '.budget__value',
      incLabel: '.budget__income--value',
      expLabel: '.budget__expenses--value',
      pctLabel: '.budget__expenses--percentage',
      container: '.container',
      expPercLabel: '.item__percentage',
      dateLabel: '.budget__title--month'
  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec, type;

    //abs and to 2 decmial place
    num = Math.abs(num);
    num = num.toFixed(2);
    //split decimal and non-decimal values
    numSplit = num.split('.');
    int = numSplit[0];
    dec = numSplit[1];

    //add comma if integer val is higher than 3
    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
    }
    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  var nodeListForEach = function(list, callback) {
      for (var i = 0; i < list.length; i++) {
          callback(list[i], i);
      }
  };

  return {
    getInput: function() {
        return {
            type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
            desc: document.querySelector(DOMstrings.inputDesc).value,
            val: parseFloat(document.querySelector(DOMstrings.inputVal).value)
        };
    },

    getDOMstrings: function() {
        return DOMstrings;
    },

    displayMonth: function() {
        var now, months, month, year;
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        now = new Date();

        month = now.getMonth();
        year = now.getFullYear();

        document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
    },

    displayBudget: function(obj) {
        var type;
        obj.budget > 0 ? type = 'exp' : type = 'inc';

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DOMstrings.expLabel).textContent = formatNumber(obj.totalExp, 'exp');

        if (obj.percentage > 0) {
            document.querySelector(DOMstrings.pctLabel).textContent = obj.percentage + '%';
        } else {
            document.querySelector(DOMstrings.pctLabel).textContent = '---';
        }
    },
    clearFields: function() {
        var fields, fieldsArr;

        fields = document.querySelectorAll(DOMstrings.inputDesc + ', ' + DOMstrings.inputVal);

        fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current, index, array) {
            current.val = "";
        });

        fieldsArr[0].focus();
    },

    delListItem: function(selectorID) {

        var el = document.getElementById(selectorID);
        el.parentNode.removeChild(el);

    },

    addListItem: function(obj, type) {
        var html, newHtml, element;

        if (type === 'inc') {
            element = DOMstrings.incContainer;

            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === 'exp') {
            element = DOMstrings.expContainer;

            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        // Replace the placeholder text
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.desc);
        newHtml = newHtml.replace('%value%', formatNumber(obj.val, type));
        // Insert the HTML
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    displayPcts: function(percentages) {

        var fields = document.querySelectorAll(DOMstrings.expPercLabel);

        nodeListForEach(fields, function(current, index) {

            if (percentages[index] > 0) {
                current.textContent = percentages[index] + '%';
            } else {
                current.textContent = '---';
            }
        });
    }
  };
})();
