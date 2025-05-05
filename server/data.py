

class Product:
	def __init__(self, id, name, price, image):
		self.id = id
		self.name = name
		self.price = price
		self.image = image

	def to_json(self):
		return {
			"id": self.id,
			"name": self.name,
			"price": self.price,
			"image": self.image
		}


def get_products():
	return [
		Product(1, "Product 1", 10.0, "../media/pexels-olenkabohovyk-3819969.jpg"),
		Product(2, "Product 2", 20.0, "../media/pexels-karolina-grabowska-4465126.jpg"),
		Product(3, "Product 3", 30.0, "../media/pexels-madebymath-90946.jpg"),
	]