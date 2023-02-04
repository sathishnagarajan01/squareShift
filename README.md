# squareShift
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock

URL for UI:http://squareshiftsathish.c1.biz/Deployed in some free hosting<br/>
URL for Backend:http://sathishnagarajan.ap-1.evennode.com/<br/>
Deployed in evennode free node hostingNOTE: Heroku needs payment, so i used this evennode.<br/>
Code is in github as a public repo, with both UI and server<br/>
Node server is created using typescript.https://github.com/sathishnagarajan01/squareShift<br/>

## Dependencies:<br/>
1. typescript should install
2. mongo server
3. node version 16.19.0 used
4. Angular CLI 15.1.4 used
5. npm 9.3.1 used
6. mongodb 6 used
7. create .env file

## create user:
>> POST http://localhost:9091/user/add
>> Authorization:Bearer csd32rsdv
>> ```
>> { "userId": 1, "username": "admin", "password": "password", "status": 1}
>> ```

## login:
>> POST http://localhost:9091/login (unauth router)
>> ```
>> { "username": "admin", "password": "password"}

## Add cart:
>> POST http://localhost:9091/cart/item
>> Authorization:Bearer csd32rsdv
>> ```
>> { "item": { "category": "women's clothing", "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.", "discount_percentage": 3, "id": 100, "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", "price": 12.99, "rating": { "count": 145, "rate": 3.6 }, "title": "DANVOUY Womens T Shirt Casual Cotton Short", "weight_in_grams": 1210 }}
>> ```

## list cart:
>> GET http://localhost:9091/cart/items
>> Authorization:Bearer csd32rsdv

## delete cart: 
>> DELETE http://localhost:9091/cart
>> Authorization:Bearer csd32rsdv

## checkout: 
>> GET http://localhost:9091/cart/checkout?postalCode=465535
>> Authorization:Bearer csd32rsdv