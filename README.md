# a very crude money manager

I attemped to deploy this app using render.com, but the backend (mongoDB atlas) only works locally on my pc :,)
https://money-manager-client.onrender.com/

### current working features:
  - adding expenses, which are displayed with their name and amount

  - the total cost of all the expenses added is displayed

  - searching expenses, which can be done by name, min and max amount, and date added
    - this changes the total cost that is displayed

  - adding goals, which can of two types: max total expenses or a max single expense
    - if a goal is added and a goal of the same type already exists, then the new goal will overwrite the old one, updating it
    - the duration / time period of the goal can be chosen, after which the goal will expire

  - if there is a goal for a max single expense, the expenses will be different color based on its status in regard to the goal
    - red means that the expense amount exceeded the max amount
    - yellow means the expense amount > 85% of the max amount
    - white means the expense amount < 85% of the max amount

  - when a goal expires, it will be crossed out and the colors of the expenses will no longer be effected by it

### work in progress features:
  - if there is a goal for max total expenses, the expenses will be different color based on its status in regard to the goal
    - red means the expense made the total greater than the max total
    - yellow means the current total > 80% of the max total
    - yellow can also mean the expense amount > 20% of the max total
    - white means the current total < 80% of the max total and the amount > 20% of the max total

### issues:
  - when a goal is overwritten, it initially just looks like the old goal was deleted
    - the page needs to be refreshed to see all the changes

  - deleting an expense or goal that was just created will lead to an error
    - refreshing the page after creating will prevent the error

  - adding / updating goals is very buggy because i am very bad with select elements (dropdown menus)
    - if adding or updating multiple goals in succession, you should select a random option and then the desired option
