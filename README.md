# Two different ways of authentication

## Stateful:
You can revoke the authentication session on the IdP anytime.
- Stateful authentication is commonly used in many applications, especially for applications that do not require scalability too much.
### How it works
- Stateful session is created on the backend side, and the corespondent session reference Id is sent to the client. Each time the client makes a request to the server, the server locates the session memory using the reference Id from the client and finds the authentication information.
- In this model, you can easily imagine that if the session memory is deleted on the backend side, then the session reference Id, which the client is holding, is completely meaningless.
  
![image](https://github.com/mr-jay-250/URL-Shortener/assets/64847529/5041c8a7-c5d5-44a0-ba17-c4ec22b061f8)

### Disadvantages
- If for some reason server will restart or state will lost then all the users will be Logged Out.
- Memory intensive - Uses server's memory, As the number of logged-in users increases, the more server resources are occupied.

## Stateless:
The session expiration time is set when the authentication token is released. You cannot revoke the session on the IdP.