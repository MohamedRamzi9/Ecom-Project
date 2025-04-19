import websocket_server

def on_message(client, server, message):
	pass

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
