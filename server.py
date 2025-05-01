import websocket_server
import json

# Constants
LOGIN = 0
SUCCESS = 1

client_users = [("client", "password", "user"),]

json_responses = []
def add_json_response(response):
	json_responses.append(response)
def get_json_responses():
	return json.dumps(json_responses)

def on_message(client, server, message):
	message = json.loads(message)	
	print(f"Request {message}")
	request = message['request']

	if request == LOGIN:
		username = message['username']
		password = message['password']
		role = message['role']
		if (username, password, role) in client_users:
			add_json_response({"response": SUCCESS})
	
	server.send_message(client, get_json_responses())
	json_responses.clear()


def on_connect(client, server):
	print("Client connected")
	for other_client in server.clients:
		if other_client != client:
			server.disconnect_client(other_client)
			print(f"Disconnected client {other_client['id']}") 


if __name__ == "__main__":
	server = websocket_server.WebsocketServer(host='localhost', port=9001)
	server.set_fn_new_client(on_connect)
	server.set_fn_message_received(on_message)
	server.run_forever()
