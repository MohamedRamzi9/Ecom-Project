

// This function is used to make a POST request to the server with the given URL
// sending the data in body of the request
// returns the response as a promise containing the response data as json
export async function request(url, data)
{
	let response = await fetch(url,
	{
		method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
	});
	const res = await response.json();
	return res;
}