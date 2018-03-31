var axios = require('axios')
axios({
	method:"POST",
	url: "https://application.freetailhackers.com/api/users/5ab13c1cc6bae000143e841f/checkin",
	headers: {'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjVhYjA0ZGI2ODRjYTZiMDAxNDNkOWVmYiI.xUrhvBmJBDWrC9aixGlPrXGEbUAixrxEA_BfTjIrRtE"}
}).then(function(response){ console.log(response)})
