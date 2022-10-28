# Hello

I'm [Jaume](https://www.linkedin.com/in/jaumefabrega/), nice to meet you :) Here's my implementation, hope you like it.

Some remarks:

- I did not implement "Display only current SME's transactions" because I did not understand the requirement :(
- I've only written a sample test but I can write more if you want.
- The security flaw that I found is that the jwt secret key is stored in a const in the code when it should be an environment variable.
- At first I also thought that there was another flaw: users can get the transactions of other users of the same SME. But then I understood the business case and saw that this is expected (and I've used this assumption in my implementation, so I hope it was right...

Have a great weekend!
