from functools import lru_cache
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings
from typing import List, Union
from pathlib import Path


class Settings(BaseSettings):
    openai_api_key: str = Field("", env="OPENAI_API_KEY")
    supabase_connection_string: str = Field("", env="SUPABASE_CONNECTION_STRING")
    secret_key: str = Field("", env="SECRET_KEY")
    allowed_origins_raw: Union[str, List[str]] = Field(default="http://localhost:3000", alias="ALLOWED_ORIGINS")
    database_url: str = Field("sqlite+aiosqlite:///./app.db", env="DATABASE_URL")
    storage_path: Path = Field(Path("./storage"))

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

    @property
    def allowed_origins(self) -> List[str]:
        v = self.allowed_origins_raw
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v or []


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
