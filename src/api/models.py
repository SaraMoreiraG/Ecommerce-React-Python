from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=True)
    country = db.Column(db.String(120), unique=False, nullable=True)
    favorites = db.relationship('Favorites', backref='user')
    orders = db.relationship('Order', backref='user')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "favorites": [favorite.serialize() for favorite in self.favorites],
            "orders": [order.serialize() for order in self.orders]
        }

collections = db.Table('product_collections',
    db.Column('collection_id', db.Integer, db.ForeignKey('collection.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'), primary_key=True)
)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)
    img = db.Column(db.String(250), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=False)
    collections = db.relationship('Collection', secondary = collections, backref=db.backref('product', lazy = True))
    price = db.Column(db.Integer(), unique=False, nullable=False)
    stock = db.relationship('Stock', backref='product')
    reference = db.Column(db.String(100), unique=True, nullable=False)
    favorites = db.relationship('Favorites', backref='product')
    orders = db.relationship('Order', backref='product')
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "img": self.img,
            "description": self.description,
            "collections": [collection.serialize() for collection in self.collections],
            "price": self.price,
            "stock": [stock.serialize() for stock in self.stock],
            "reference": self.reference,
            "likes": len(self.favorites),
            "orders": [order.serialize() for order in self.orders]
        }

class Collection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    img = db.Column(db.String(255), unique=True, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'img': self.img
        }

class Color(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)
    rgb = db.Column(db.String(40), unique=True, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'rgb': self.rgb,
        }

class Size(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }

class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    size_id = db.Column(db.Integer, db.ForeignKey('size.id'), nullable=False)
    color_id = db.Column(db.Integer, db.ForeignKey('color.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    
    # Define the relationship with Size and Color
    size = db.relationship('Size', backref=db.backref('stock'))
    color = db.relationship('Color', backref=db.backref('stock'))
    
    def serialize(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'size_id': self.size_id,
            'color_id': self.color_id,
            'quantity': self.quantity
        }

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer(), db.ForeignKey('product.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product': Product.query.get(self.product_id).serialize()
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    color = db.Column(db.String(40), nullable=False)
    size = db.Column(db.String(40), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'status': self.status,
            'products': [
                {
                    'product_id': self.product_id,
                    'color': self.color,
                    'size': self.size,
                    'quantity': self.quantity
                }
            ]
        }