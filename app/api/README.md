<details>
 <summary>
  <code>GET</code> <code><b>/api/accounts</b></code>
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
  <code>POST</code> <code><b>/api/accounts</b></code>
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
  <code>GET</code> <code><b>/api/accounts/[id]</b></code>
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

<details>
 <summary>
  <code>GET</code> <code><b>/api/companies</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/companies/[id]</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/companies/company</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>POST</code> <code><b>/api/companies</b></code>
 </summary>
</details>


<details>
 <summary>
  <code>GET</code> <code><b>/api/meetings</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/meetings/[id]</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>POST</code> <code><b>/api/meetings</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/meetings/timespans</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/meetings/timespans/available</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/meetings/days</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>POST</code> <code><b>/api/steps</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/steps/[id]</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>POST</code> <code><b>/api/services</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/services/[id]</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>POST</code> <code><b>/api/painpoints</b></code>
 </summary>
</details>

<details>
 <summary>
  <code>GET</code> <code><b>/api/painpoints/[id]</b></code>
 </summary>
</details>