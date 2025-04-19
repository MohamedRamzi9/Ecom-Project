
import threading
import websocket_server
import json


class Task:
	id = 0
	def __init__(self, name):
		self.name = name
		self.done = False
		self.id = Task.id
		Task.id += 1

	def is_done(self):
		return self.done
	
	def __eq__(self, value: object) -> bool:
		if isinstance(value, Task):
			return self.id == value.id
		elif isinstance(value, str):
			return self.name == value
		elif isinstance(value, int):
			return self.id == value
		return False

	def dict(self):
		return {'name': self.name, 'done': self.done, 'id': self.id}

	def __repr__(self):
		return f"Task id {self.id} '{self.name}' is '{'done' if self.done else 'not done'}'"

class List:
	id = 0
	def __init__(self, name):
		self.id = List.id
		List.id += 1
		self.name = name
		self.tasks = []

	def add_task(self, task):
		self.tasks.append(task)

	def remove_task(self, task):
		self.tasks.remove(task)

	def get_task(self, id):
		for t in self.tasks:
			if t.id == id:
				return t
			
	def get_tasks(self):
		return self.tasks
	
	def dict(self):
		return {'name': self.name, 'id': self.id} 

class Data:
	def __init__(self):
		self.lists = []

	def add_list(self, name):
		self.lists.append(name)

	def get_list(self, id):
		for l in self.lists:
			if l.id == id:
				return l

	def remove_list(self, id):
		self.lists.remove(self.get_list(id))

	def get_lists(self):
		return self.lists

data = Data()
current_list: List|None = None

def get_list(id):
	for l in data.get_lists():
		if l.id == id:
			return l


def get_json(message):
	return json.loads(message)


def dispatch(json):

	def get_tasks():
		print(f"Get tasks")
		tasks_json = []
		if current_list is not None:
			for task in current_list.get_tasks():
				tasks_json.append(task.dict())
		return {'type': 'tasks', 'tasks': tasks_json}

	def get_lists():
		lists_json = []
		for l in data.get_lists():
			lists_json.append(l.dict())
		print(lists_json)
		return {'type': 'lists', 'lists': lists_json}
		
	request = json['type']

	global current_list

	if request == 'get_lists':
		return get_lists()
	
	elif request == 'get_tasks':
		return get_tasks()
	
	elif request == 'add_list':
		print("Add list")
		data.add_list(List(json['name']))
		return get_lists()

	elif request == 'add_task':
		print("Add task")
		current_list.add_task(Task(json['name']))
		return get_tasks()

	elif request == 'delete_task':
		print(f"Delete task {json['id']}")
		task = current_list.get_task(json['id'])
		current_list.remove_task(task)
		return get_tasks()

	elif request == 'set_current_list':
		current_list = get_list(json['id'])
		return get_tasks()

	elif request == 'set_task_done':
		task = current_list.get_task(json['id'])
		task.done = json['done']
		return get_tasks()


def new_client(client, server):
	print("New client connected and was given id %d" % client['id'])
	for c in server.clients:
		if c != client:
			server.send_message(c, "You have been disconnected")
			server.client_left(c)

	server.send_message_to_all("Hey, new client has joined us")

def on_message(client, server, message):
	message = get_json(message)
	print("Received message: ", message)
	response = dispatch(message)
	if response is not None:
		server.send_message(client, json.dumps(response))

server = websocket_server.WebsocketServer(host='localhost', port=8080)
server.set_fn_new_client(new_client)
server.set_fn_message_received(on_message)
threading.Thread(target=server.run_forever).start()
print("Server started")
