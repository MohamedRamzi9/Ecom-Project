categories = [
	"Electronics",
	"Clothing",
]

class Product:
	def __init__(self, id, name, price, description, category, image):
		self.id = id
		self.name = name
		self.price = price
		self.description = description
		self.category = category
		self.image = image

	def to_json(self):
		return {
			"id": self.id,
			"name": self.name,
			"price": self.price,
			"description": self.description,
			"category": self.category,
			"image": self.image
		}

products = [
	Product(1, "Product 1", 10.0, "Description for Product 1", categories[0], "../media/pexels-olenkabohovyk-3819969.jpg"),
	Product(2, "Product 2", 20.0, "Description for Product 2", categories[1], "../media/pexels-karolina-grabowska-4465126.jpg"),
	Product(3, "Product 3", 30.0, "Description for Product 3", categories[0], "../media/pexels-madebymath-90946.jpg"),
]

class Filter:
	def __init__(self):
		self.name = None
		self.category = None

	def set_name(self, name):
		self.name = name

	def set_category(self, category):
		self.category = category

	def match(self, product):
		result = True
		if self.category is not None:
			result &= product.category == self.category
		if self.name is not None:
			result &= self.name.lower() in product.name.lower()
		return result

def get_products(filter=Filter()):
	return [product for product in products if filter.match(product)]