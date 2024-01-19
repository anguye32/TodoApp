from flask import Blueprint, request, jsonify
from app import db
from app.models.todo_model import Todo
from extensions import db

todo_bp = Blueprint('todo_bp', __name__)

# Create a new todo item
@todo_bp.route('/todo', methods=['POST'])
def create_todo():
    data = request.get_json()
    new_todo = Todo(title=data['title'])
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'message': 'Todo item created', 'todo': {'id': new_todo.id, 'title': new_todo.title}}), 201

# Get all todo items
@todo_bp.route('/todo', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    todo_list = [{'id': todo.id, 'title': todo.title, 'completed': todo.completed} for todo in todos]
    return jsonify({'todos': todo_list}), 200

# Get a single todo item
@todo_bp.route('/todo/<int:id>', methods=['GET'])
def get_todo(id):
    todo = Todo.query.get_or_404(id)
    return jsonify({'id': todo.id, 'title': todo.title, 'completed': todo.completed}), 200

# Update a todo item
@todo_bp.route('/todo/<int:id>', methods=['PUT'])
def update_todo(id):
    todo = Todo.query.get_or_404(id)
    data = request.get_json()
    todo.title = data['title']
    todo.completed = data['completed']
    db.session.commit()
    return jsonify({'message': 'Todo item updated', 'todo': {'id': todo.id, 'title': todo.title, 'completed': todo.completed}}), 200

# Delete a todo item
@todo_bp.route('/todo/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'message': 'Todo item deleted'}), 200
