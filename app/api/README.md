<details>
 <summary>
  <code>GET</code> <code><b>/api/account</b></code>
 </summary>

 > Returnes something as long as the requester is logged in, i.e. the login cookies are available

 ## Response

 ```typescript
 {
  id: number;
  role: 'USER' | 'EMPLOYEE';
  name: string;
  email: string;
  company: Company | null;
  meetings: Meeting[];
  subscriptionSales: Subscription[];
  serviceSales: SubscriptionServices[];
 }
 ```

</details>

<details>
 <summary>
  <code>POST</code> <code><b>/api/account</b></code>
 </summary>

 ## Parameters

 #### Body

 ```typescript
 {
  email: string;
 }
 ```

 ## Response

 #### `200`

 ```typescript
 {
  id: number;
  role: 'USER' | 'EMPLOYEE';
  name: string;
  email: string;
  company: Company | null;
  meetings: Meeting[];
  subscriptionSales: Subscription[];
  serviceSales: SubscriptionServices[];
 }
 ```

---

 #### `201`

 ```typescript
 {

 }
 ```

</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/account/[id]</b></code>
 </summary>

 ## Parameters

 #### Params

 | name | type | description |
 |-|-|-|
 | **id** | `number` | *The Account ID* |

 ## Response

 #### `200`

 > It returns less than `/account` route because the api endpoint is publicly accessible

 ```typescript
 {
  id: number;
  role: 'USER' | 'EMPLOYEE';
  name: string;
  email: string;
  company: Company | null;
 }
 ```

</details>