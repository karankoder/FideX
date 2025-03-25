import datetime
from pydantic import BaseModel
import yaml
import json

from .utils import calculate_token_length
from .tools import get_tools, ToolCallSchema

class SystemPromptSchema(BaseModel):
    """Description of the agent's system prompt"""

    Role: str
    Objective: str
    Tools: str


class PromptGenerator:
    def __init__(self, config: dict):
        # Chat ML config
        self.user_prepend = config["chat_ml"]["user_prepend"]
        self.user_append = config["chat_ml"]["user_append"]
        self.line_separator = "\n"

        # System prompt
        with open(config["agent"]["system_prompt_template"], "r") as system_prompt_file:
            yaml_content = yaml.safe_load(system_prompt_file)
            self.system_prompt_schema = SystemPromptSchema(
                Role=yaml_content.get("Role", ""),
                Objective=yaml_content.get("Objective", ""),
                Tools=yaml_content.get("Tools", ""),
            )

    def system_prompt(self, token_limit: int) -> tuple[str, int]:
        """Build the system prompt with a max number of tokens"""

        date = datetime.datetime.now().strftime("%A, %B %d, %Y @ %H:%M:%S")
        variables = {
            "date": date,
            "tools": json.dumps(get_tools()),
            "tool_schema": json.dumps(ToolCallSchema.model_json_schema()),
        }

        system_prompt = ""
        for _, value in self.system_prompt_schema.dict().items():
            formatted_value = value.format(**variables)
            formatted_value = formatted_value.replace("\n", " ")
            system_prompt += f"{formatted_value}"

        system_prompt = f"{self.user_prepend}system{self.line_separator}{system_prompt}{self.user_append}{self.line_separator}"

        used_tokens = calculate_token_length(system_prompt)

        if used_tokens > token_limit:
            raise OverflowError("PromptGenerator::system_prompt: exceeding token limit")

        return system_prompt, used_tokens

    def user_prompt(self, message: str, token_limit: int) -> tuple[str, int]:
        """Build the prompt with user message"""

        prompt = f"{self.user_prepend}user{self.line_separator}{message}{self.user_append}{self.line_separator}{self.user_prepend}assistant{self.line_separator}"

        used_tokens = calculate_token_length(prompt)

        if used_tokens > token_limit:
            raise OverflowError("PromptGenerator::user_prompt: exceeding token limit")

        return prompt, used_tokens

    def tool_prompt(self, tool_message: str) -> str:
        return f"{self.line_separator}{self.user_append}{self.line_separator}{self.user_prepend}tool{self.line_separator}{tool_message}{self.user_append}{self.line_separator}"
