from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.auth import routes as auth_routes
from app.projects import routes as project_routes
from app.tasks import routes as task_routes

# Create all tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Management Tool")

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(project_routes.router, prefix="/projects", tags=["Projects"])
app.include_router(task_routes.router, prefix="/tasks", tags=["Tasks"])

@app.get("/")
def root():
    return {"message": "Project Management API is running"}