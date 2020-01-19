var controller = (function(budgetCtrl, UICtrl) {

  var eventListeners = function() {
      var DOM = UICtrl.getDOMstrings();

      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

      document.addEventListener('keypress', function(event) {
          if (event.keyCode === 13 || event.which === 13) {
              ctrlAddItem();
          }
      });

      document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

  };

  var updateBudget = function() {

      budgetCtrl.calBudget();
      var budget = budgetCtrl.getBudget();
      UICtrl.displayBudget(budget);
  };

  var updatePcts = function() {

      budgetCtrl.calExpPcts();
      var percentages = budgetCtrl.getExpPcts()
      UICtrl.displayPcts(percentages);
  };

  var ctrlAddItem = function() {
      var input, newItem;

      //get the field input data
      input = UICtrl.getInput();

      //check for invalid inputs
      if (input.desc !== "" && !isNaN(input.val) && input.val > 0) {
          newItem = budgetCtrl.add(input.type, input.desc, input.val);
          UICtrl.addListItem(newItem, input.type);
          UICtrl.clearFields();
          updateBudget();
          updatePcts();
      }
  };

  var ctrlDeleteItem = function(event) {

      var itemID, splitID, type, ID;
      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
      if (itemID) {
          splitID = itemID.split('-');
          type = splitID[0];
          ID = parseInt(splitID[1]);
          budgetCtrl.del(type, ID);
          UICtrl.delListItem(itemID);
          updateBudget();
          updatePcts();
      }
  };

  return {
      init: function() {
          console.log('Application has started.');
          UICtrl.displayMonth();
          UICtrl.displayBudget({
              budget: 0,
              totalInc: 0,
              totalExp: 0,
              percentage: -1
          });
          eventListeners();
      }
  };

})(budgetController, UIController);

controller.init();
