import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app.database import SessionLocal, engine, Base
from app.models import User, Project, Task
from app.auth.utils import hash_password
from datetime import datetime

Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()

    # Clear existing data
    db.query(Task).delete()
    db.query(Project).delete()
    db.query(User).delete()
    db.commit()

    # Create users
    user1 = User(email="alice@test.com", hashed_password=hash_password("password123"))
    user2 = User(email="bob@test.com", hashed_password=hash_password("password123"))
    db.add_all([user1, user2])
    db.commit()
    db.refresh(user1)
    db.refresh(user2)

    # Create projects
    p1 = Project(title="Website Redesign", description="Redesign the company website", status="active", owner_id=user1.id)
    p2 = Project(title="Mobile App", description="Build a mobile app for iOS and Android", status="active", owner_id=user1.id)
    p3 = Project(title="Data Migration", description="Migrate old database to new system", status="completed", owner_id=user2.id)
    db.add_all([p1, p2, p3])
    db.commit()
    db.refresh(p1)
    db.refresh(p2)
    db.refresh(p3)

    # Create tasks
    tasks = [
        Task(title="Design mockups", description="Create Figma mockups", status="done", due_date=datetime(2025, 1, 15), project_id=p1.id),
        Task(title="Frontend development", description="Build React components", status="in-progress", due_date=datetime(2025, 2, 28), project_id=p1.id),
        Task(title="Backend API", description="Build REST API", status="todo", due_date=datetime(2025, 3, 15), project_id=p1.id),
        Task(title="Setup React Native", description="Initialize the project", status="done", due_date=datetime(2025, 1, 10), project_id=p2.id),
        Task(title="Build auth screens", description="Login and register screens", status="in-progress", due_date=datetime(2025, 2, 10), project_id=p2.id),
        Task(title="Export old data", description="Export data to CSV", status="done", due_date=datetime(2025, 1, 5), project_id=p3.id),
        Task(title="Import to new DB", description="Run import scripts", status="done", due_date=datetime(2025, 1, 20), project_id=p3.id),
    ]
    db.add_all(tasks)
    db.commit()

    print("✅ Database seeded successfully!")
    print("Users: alice@test.com / bob@test.com (password: password123)")
    db.close()

if __name__ == "__main__":
    seed()