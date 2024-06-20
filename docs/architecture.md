```mermaid
graph TD
    A[React Client] -->|HTTP Requests| B[Express API Server]
    B -->|Mongoose| C[MongoDB Database]
    B -->|Proxy Requests| D[D&D 5e API] 
```    