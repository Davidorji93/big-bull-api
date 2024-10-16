Big Bull (BB) API Documentation
This API allows users to interact with the Big Bull platform, where they can earn rewards by signing up, referring users, withdrawing funds, increasing levels, completing tasks, bidding in auctions, and more.

Base URL:


1. User Signup
Endpoint: /signup
Method: POST
Description: Registers a user and grants BB (Big Bull Tokens) and a $1 signup bonus. The BB earned depends on how many years the user's Telegram account has existed (must be ≥ 3 years).
Request Parameters:
telegram_account: (String) User's Telegram account username or ID.
years_active: (Number) How many years the Telegram account has been active (minimum 3).
Response:
earned_BB: (Number) The amount of BB earned.
signup_bonus: (Number) The signup bonus (fixed at $1).
message: (String) Status message.


Example Request:
j
POST /signup
{
  "telegram_account": "user123",
  "years_active": 5
}
Example Response:

{
  "message": "Signup successful",
  "earned_BB": 50,
  "signup_bonus": 1
}


2. Referral
Endpoint: /referral
Method: POST
Description: Refers a new user and earns $0.1 per referral if the referred user has a Telegram account that is at least 3 years old.

Request Parameters:
referrer_id: (String) The ID of the user who is making the referral.
referral_telegram_account: (String) Telegram account of the referred user.
referral_years_active: (Number) Number of years the referred user's Telegram account has existed (minimum 3).
Response:
referral_bonus: (Number) Referral reward (fixed at $0.1 per valid referral).
message: (String) Status message.
Example Request:

POST /referral
{
  "referrer_id": "user123",
  "referral_telegram_account": "user456",
  "referral_years_active": 4
}

Example Response:

{
  "message": "Referral successful",
  "referral_bonus": 0.1
}

3. Withdrawal
Endpoint: /withdraw
Method: POST
Description: Users can withdraw their balance when they have at least $5, but must pay a withdrawal fee and complete a task.
Request Parameters:
user_id: (String) The ID of the user requesting withdrawal.
amount: (Number) The amount to withdraw (minimum $5).
withdrawal_fee: (Number) The fee for making the withdrawal.
task_completed: (Boolean) Indicates if the user has completed the withdrawal task.
Response:
withdrawn_amount: (Number) The amount withdrawn.
remaining_balance: (Number) Remaining balance after withdrawal.
message: (String) Status message.
Example Request:

POST /withdraw
{
  "user_id": "user123",
  "amount": 10,
  "withdrawal_fee": 1,
  "task_completed": true
}
Example Response:

{
  "message": "Withdrawal successful",
  "withdrawn_amount": 10,
  "remaining_balance": 40
}
4. Update User Level
Endpoint: /update-level
Method: POST
Description: Increases a user's level by spending BB or USDT.
Request Parameters:
user_id: (String) The ID of the user whose level is being updated.
increase_by: (Number) The number of levels the user wants to increase.
currency: (String) The currency used for the upgrade, either 'BB' or 'USDT'.
Response:
new_level: (Number) The updated user level.
message: (String) Status message.
Example Request:

POST /update-level
{
  "user_id": "user123",
  "increase_by": 2,
  "currency": "BB"
}
Example Response:

{
  "message": "Level updated",
  "new_level": 5
}
5. Fuel Refill
Endpoint: /fuel
Method: POST
Description: Refills the user's fuel tank using either free refills or USDT.
Request Parameters:
user_id: (String) The ID of the user refilling the fuel tank.
use_free_refill: (Boolean) Indicates if the user is using a free refill.
pay_with_USDT: (Boolean) Indicates if the user is paying with USDT for an instant refill.
Response:
fuel_status: (Object) Contains the current fuel status, including free refills left and USDT spent.
message: (String) Status message.
Example Request:

POST /fuel
{
  "user_id": "user123",
  "use_free_refill": true,
  "pay_with_USDT": false
}
Example Response:

{
  "message": "Fuel refilled",
  "fuel_status": {
    "current_fuel": 100,
    "free_refills_left": 2,
    "USDT_spent": 0
  }
}
6. Increase Energy Level
Endpoint: /energy
Method: POST
Description: Increases the user's energy level, which controls how fast the fuel tank refills.
Request Parameters:
user_id: (String) The ID of the user increasing their energy level.
increase_energy: (Number) The amount by which to increase the energy level.
currency: (String) The currency used, either 'BB' or 'USDT'.
Response:
new_energy_level: (Number) The updated energy level.
new_refill_speed: (Number) The updated fuel refill speed (in hours).
message: (String) Status message.
Example Request:

POST /energy
{
  "user_id": "user123",
  "increase_energy": 1,
  "currency": "BB"
}
Example Response:
json
Copy code
{
  "message": "Energy level updated",
  "new_energy_level": 4,
  "new_refill_speed": 10
}
7. Task Completion
Endpoint: /complete-task
Method: POST
Description: Users complete various tasks to earn rewards, such as repeat tasks, video tasks, Telegram, and social tasks.
Request Parameters:
user_id: (String) The ID of the user completing the task.
task_type: (String) The type of task being completed (e.g., 'repeat', 'video', 'telegram', 'social').
Response:
reward: (Object) The reward earned (BB or USDT).
message: (String) Status message.
Example Request:

POST /complete-task
{
  "user_id": "user123",
  "task_type": "video"
}
Example Response:
json
Copy code
{
  "message": "Task completed",
  "reward": {
    "BB": 5,
    "USDT": 0
  }
}
8. Account Validation
Endpoint: /validate-account
Method: POST
Description: Users must spend USDT to validate their account and qualify for an airdrop.
Request Parameters:
user_id: (String) The ID of the user validating the account.
USDT_spent: (Number) The amount of USDT spent on validation.
Response:
eligible_for_airdrop: (Boolean) Whether the user is now eligible for an airdrop.
message: (String) Status message.
Example Request:

POST /validate-account
{
  "user_id": "user123",
  "USDT_spent": 10
}
Example Response:
json
Copy code
{
  "message": "Account validated",
  "eligible_for_airdrop": true
}
9. Predict and Win
Endpoint: /predict-win
Method: POST
Description: Users can predict the price of a cryptocurrency and win BB if their guess is correct.
Request Parameters:
user_id: (String) The ID of the user making the prediction.
crypto: (String) The cryptocurrency symbol (e.g., 'BTC').
predicted_price: (Number) The price predicted by the user.
Response:
prediction_status: (String) The status of the prediction ('pending' or 'completed').
won_BB: (Number) The amount of BB won if the prediction is successful.
message: (String) Status message.
Example Request:
json
Copy code
POST /predict-win
{
  "user_id": "user123",
  "crypto": "BTC",
  "predicted_price": 40000
}
Example Response:

{
  "message": "Prediction submitted",
  "prediction_status": "pending"
}
10. Bidding Auction
Endpoint: /bid
Method: POST
Description: Users can place bids in an auction, and the highest bidder wins using USDT or BB.
Request Parameters:
user_id: (String) The ID of the user placing the bid.
bid_amount: (Object) The amount of USDT or BB placed as the bid.
Response:
auction_status: (String) Whether the auction was won or lost.
won_item: (Object) The item or reward won in the auction, if applicable.
message: (String) Status message.
Example Request:

POST /bid
{
  "user_id": "user123",
  "bid_amount": {
    "USDT": 50,
    "BB": 100
  }
}
Example Response:

{
  "message": "Bid placed",
  "auction_status": "pending"
}

Summary of Key Endpoints:
Auth:
POST /api/auth/signup
POST /api/auth/login
Users:
GET /api/users (Get all users)
GET /api/users/:id (Get user by ID)
Tasks:
GET /api/tasks (Get all tasks)
POST /api/tasks (Create a new task)
Predictions:
GET /api/predictions (Get all predictions)
Auctions:
GET /api/auctions (Get all auctions)
Bids:
GET /api/bids (Get all bids)
Transactions:
GET /api/transactions (Get all transactions)
