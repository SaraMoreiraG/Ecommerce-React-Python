import os
from flask_admin import Admin
from .models import db, User, Product, Collection, Color, Size, Stock, Favorites, Order
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Customize the ModelView for the User model
    class UserAdminModelView(ModelView):
        column_list = ('id', 'name', 'email', 'password', 'favorites', 'orders')  # Include favorites and orders columns
        column_labels = {
            'favorites': 'Favorites',  # Rename the column label if desired
            'orders': 'Orders'
        }

    admin.add_view(UserAdminModelView(User, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Collection, db.session))
    admin.add_view(ModelView(Color, db.session))
    admin.add_view(ModelView(Size, db.session))
    admin.add_view(ModelView(Stock, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    admin.add_view(ModelView(Order, db.session))
