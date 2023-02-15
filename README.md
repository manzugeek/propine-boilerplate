
#### This is a command line program that returns the latest portfolio value per token in USD for the transactions logged in a CSV file.

##### Here are some of the design decisions that I made for the program:
  -  Used Node.js: As the program is a command-line tool, I decided to use Node.js, as it is a widely used platform for building command-line tools and it has a built-in fs module that can be used to read and write to files.
  - Used the csv-parser library to parse the CSV file. This library provides a simple API for parsing CSV data and converting it into JavaScript objects.
  - Used Promises to handle the asynchronous calls to the CryptoCompare API. This makes the code more readable and easier to reason about, as Promises provide a way to handle asynchronous operations in a synchronous way.
 - I used environment variables to store the API key for the CryptoCompare API. This helps to keep the API key secure and prevents it from being checked into version control.
 - I structured the program into modules, each with a specific responsibility. This makes the code easier to maintain and test, and allows for code reuse.
 - Used error handling: I added error handling to the program to handle cases where the CSV file or the API request fails. This makes the program more robust and helps to prevent crashes.
 - Used the latest exchange rate: I used the price API endpoint provided by CryptoCompare to get the latest exchange rate for each token. This ensures that the program returns the most up-to-date portfolio value.
```
Overall, the design decisions were made to make the program easy to use, maintain, and extend.</p>
```

