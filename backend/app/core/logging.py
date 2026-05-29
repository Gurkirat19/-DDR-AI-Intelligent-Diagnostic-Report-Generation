import logging
import sys
from typing import Any, Dict

import structlog

LOG_LEVEL = logging.INFO

logging.basicConfig(
    format="%(message)s",
    stream=sys.stdout,
    level=LOG_LEVEL,
)

structlog.configure(
    wrapper_class=structlog.make_filtering_bound_logger(LOG_LEVEL),
    processors=[
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ],
)


def get_logger(name: str) -> structlog.stdlib.BoundLogger:  # type: ignore
    return structlog.get_logger(name)
