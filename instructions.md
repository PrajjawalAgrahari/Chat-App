1. Don't forget to use e.preventDefault() when you have to fetch something from the server.

```
            async function register(e) 
            {
                e.preventDefault();
                const {data} = await axios.post("/register", { username, password });
                setLoggedInUsername(username);
                setId(data.id);
            }
```