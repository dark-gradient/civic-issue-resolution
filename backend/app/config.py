from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017"
    MONGODB_DATABASE: str = "civic_issue_db"
    JWT_SECRET: str = "supersecret"
    JWT_ACCESS_TOKEN_EXPIRE: int = 1440
    REDIS_URL: str = "redis://localhost:6379/0"
    OBJECT_STORAGE_URL: str = ""
    OBJECT_STORAGE_KEY: str = ""
    OBJECT_STORAGE_SECRET: str = ""
    FRONTEND_URL: str = "https://civic-frontend.onrender.com"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
