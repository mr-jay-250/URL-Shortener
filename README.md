# Two different ways of authentication

## Stateful:
You can revoke the authentication session on the IdP anytime.
- Stateful authentication is commonly used in many applications, especially for applications that do not require scalability too much.
### How it works
- Stateful session is created on the backend side, and the corespondent session reference Id is sent to the client. Each time the client makes a request to the server, the server locates the session memory using the reference Id from the client and finds the authentication information.
- In this model, you can easily imagine that if the session memory is deleted on the backend side, then the session reference Id, which the client is holding, is completely meaningless.
  
![image](https://github.com/mr-jay-250/URL-Shortener/assets/64847529/5041c8a7-c5d5-44a0-ba17-c4ec22b061f8)

### Advantages
- Revoke the session anytime
- Easy to implement and manage for one-session-sever scenario (Bankinf sites uses this because they wanted to do operations on session basis)
- Session data can be changed later (assume that for a one-session-sever, no inconsistent problem)

### Disadvantages
- If for some reason server will restart or state will lost then all the users will be Logged Out.
- Memory intensive - Uses server's memory, As the number of logged-in users increases, the more server resources are occupied.

## Stateless:
The session expiration time is set when the authentication token is released. You cannot revoke the session on the IdP.

### How it works
Note: Here I am not talking a specific authentication protocol, while I am trying to give an simple example to illustrate the ideas. If you are looking for concrete industrial standards, please refer to OpenID Connect and JSON Web Token (JWT).

- Stateless authentication stores the user session data on the client side (browser). The data is signed by the key of IdP to ensure the integrity and authority of the session data.
- Since the user session is stored on the client side, the server only have the capability to verify its validity by checking whether the payload and the signature match.

```
Payload:
{
  id: 1234,
  user: "kennethchoi",
  FirstName: "Kenneth",
  LastName: "Choi",
  Expiration: 1525132799 // 2018-04-30T23:59:59+00:00
}
Signature (a string) using a specific algorithm and the private key to sign:
XxxxXXXxxxxXXXXXXxxxxXX
```

![image](https://github.com/mr-jay-250/URL-Shortener/assets/64847529/1e29fbb7-d740-47e5-8dfc-e64c312d0af8)

### Advantages
- Lower server overhead: The great number of session data does not store on the server side. We can store more user properties on the client-side session data to reduce the number of database access without worrying the memory overhead on the server.
- Easy to scale: Since the session data is stored on the client side, it does not matter which backend server the request is routed to, as long as all backend servers share the same private key, then all servers have the same capability to verify the validity of the session.

### Disadvantages
- Cannot revoke the session anytime: Since the user session is stored at client side, the server does not have any rights to delete the session.
- Relatively complex to implement for one-session-server scenario: The advantages of stateless authentication is scalability. However, it increases the technical complexity and it is not extremely useful when we only have one-session-server.
- Session data cannot be changed until its expiration time: Suppose we want to add “Age” property to the session data above, probably we can ask the client to update it, but we cannot make sure the client does update it, since its previously session data is not expired yet, then the client still has the chance to make requests with old session data.