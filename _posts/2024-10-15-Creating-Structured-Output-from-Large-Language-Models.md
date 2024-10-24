---
    layout: post
    title:  "Creating Structured Output from Large Language Models"
    date:   2024-10-15 21:38:50 +0530
    categories: Creating Structured Output from Large Language Models
    writer: " Sushant Thotakura"
---


# Creating Structured Output from Large Language Models

## Introduction

In today's rapidly evolving AI landscape, large language models (LLMs) such as GPT-4, Anthropic, Bard, Llama etc. are revolutionizing industries by enabling machines to generate human-like text. Their ability to understand and produce language has led to significant advancements across fields such as customer support automation, content generation, and even coding assistance. While these models excel at generating natural language responses, they often struggle when producing highly structured or precise output data. 

Frameworks such as LangChain as well as LLM models such as GPT have the capability to obtain a structured output, but there might be some limitations for integrating such frameworks. For example, having LangChain on an AWS Lambda isn’t feasible due to the size restrictions (max 256 MB) of such packages. In case of the inbuilt GPT function to obtain a JSON output, maintaining a very large schema becomes troublesome. This is where the integration of tools such as **Pydantic** schemas becomes critical.

**Pydantic**, a powerful data validation and parsing library in Python, can be leveraged to bridge this gap. By defining strict, structured schemas, developers can prompt LLMs to generate output that conforms to predefined formats, ensuring both reliability and accuracy to support critical applications. This approach provides the best of both worlds: the flexibility and creativity of LLMs combined with the structured output needed in real-world systems, such as data pipelines, APIs, and backend integrations.

## Implementation Steps

In this blog, we will look at a use case for identifying meal type and other information from a user prompt. Rather than asking for the nutritional information, the example will try to create a structured output from the user prompt. This can then be expanded to various use cases, including obtaining complete nutritional information in a structured output.

### Prerequisites

The version of python required is 3.8 or higher. gpt-4o-mini is the LLM being used for this example and is provided by OpenAI and it is necessary to have an API key for the same.

### Install Dependencies

Install the required dependencies. 

```bash
pip install pydantic openai
```

### OpenAI API Key Setup

The api key obtained earlier will be set up in this step.

```python
import os

os.environ["OPENAI_API_KEY"]= "...."
```

### Import Required Packages

Import the required packages and functions. The “json”  library is used to parse the input schema and the output schema. “Enum” is particularly useful if we want to have strict categories for any of the fields.

```python
import copy
import json
from enum import Enum
from typing import Any, Type
import pydantic
from openai import OpenAI
```

### Creating the Schema

We will be considering three different key value pairs for this use case -  the type of meal, the quantity and the name. For the type of the meal, we want to categorize it into only three types - breakfast, lunch and dinner. In the meal quantity, we want to capture the quantity, for example - 2 in 2 cups of milk and the size of the portion. The same information has been added into the descriptions of each field. Note that, we can set a default value and the type for each of these fields. For quantity, integer is the type and default value is 1. We then create a class for the name of the food item. Eventually, we create a class called MealInfo, which will be the culmination of all the above mentioned classes. This helps to better manage the schema as we are decentralizing and breaking the larger schema into smaller parts. The description added for each of the fields helps the LLM to better understand the context of each key value pair and accordingly tries to fill it.


```python
class MealType(str, Enum):
  BREAKFAST = "breakfast"
  LUNCH = "lunch"
  DINNER = "dinner"

class MealQuantity(pydantic.BaseModel):
  Quantity: int = pydantic.Field(
      1,
      description= "Integer value that represents the quantity of food, for example, in 2 cups milk, 2 is this field"
  )
  Size: str | None = pydantic.Field(
      None,
      description= "This is the size of the serving, for example, Cup, Bowl, Plate, etc."
  )

class MealName(pydantic.BaseModel):
  Name: str = pydantic.Field(
      description= "Name of the food item"
  )


class MealInfo(pydantic.BaseModel):
  meal_name: MealName = pydantic.Field(
      description= "Identify the name of the food item."
  )
  meal_quantity: MealQuantity | None = pydantic.Field(
      None,
      description= "Size and quantity of the portion of the food item"
  )
  meal_type: MealType | None = pydantic.Field(
      None,
      description= "The type of the meal based on the time of the day."
  )

```

### Helper Functions

A few helper functions are then created to assist with parsing the schema to be sent to the LLM as well as parse the output generated by the LLM into a JSON object. The function “flatten_single_element” will flatten any nested dictionaries. The “get_schema” function is used to fetch this flattened schema. “Deepcopy” is used to create a completely independent copy of the original object and all its nested objects. This means that any changes made to the copied object will not affect the original object, and vice versa. Finally the “clean_response” function is used to remove any unwanted text from the output object and format it as a JSON. Note the implementation of the “clean_response” function may vary depending on the LLM being used. The function shown in this example is based  on the output from the OpenAI API’s.



```python
def flatten_single_element(d: Any) -> Any:
    if isinstance(d, dict):
        if "allOf" in d and len(d["allOf"]) == 1:
            for k, v in d["allOf"][0].items():
                if k not in d:
                    d[k] = v
            del d["allOf"]
        for k in d.keys():
            d[k] = flatten_single_element_allof(d[k])
        return d
    elif isinstance(d, list):
        return [flatten_single_element_allof(e) for e in d]
    else:
        return d

def get_schema(
    target_schema: Type[pydantic.BaseModel],
) -> dict[str, Any]:

    defs =  target_schema.schema()
    defs = flatten_single_element_allof(defs)

    defs = copy.deepcopy(defs)

    return defs  # type: ignore

def clean_response(content):
  content = content.replace("```", "").replace("json","")
  final_json = json.loads(content)
  return final_json
  ```

### OpenAI API Call

The prompt is then created in order to be used for the LLM. The flattened schema is appended to the prompt and the LLM is then instructed to fill in information that is compliant with the schema already provided. It can be observed that we are only adding two lines in the prompt and the rest is being passed through the schema.

```python
def create_prompt(target_schema: Type[pydantic.BaseModel] | None):
  schema_json = json.dumps(
      get_schema_of_chart_config(target_schema),
      indent=2,
  )

  prompt = """
   Your task is to fill in the information about the food item based on the user input.
   Responses should be in JSON format compliant to the following JSON schema.

  """ + schema_json.replace("\{", "\{{").replace("\}", "\}}")

  return prompt

chat_completeion = client.chat.completions.create(
    model = "gpt-4o-mini",
    messages= [
        { "role": "system", "content": prompt},
        {
            "role": "user",
            "content": "I had milk in the morning"
        }
    ]
)

response = clean_response(chat_completeion.choices[0].message.content)
print(response)
```

### Output

The above process results in the output shown below. The user prompt provided was “I had milk in the morning” and as displayed below, the name of the food item has been identified as “Milk”. Although any information regarding quantity was provided, default values based on the description in the schema (quantity = 1 and size = cup) have been pre-filled. Since the word morning was provided, the meal type was assumed to be breakfast. 

```json
{
  "meal_name": {"Name": "Milk"},
  "meal_quantity": {"Quantity": 1, "Size": "Cup"},
  "meal_type": "breakfast"
}
```

## Conclusion

As LLMs continue to advance, their integration with various functions becomes key. However, ensuring that these models produce structured and reliable outputs remains a challenge, especially in data-driven environments where consistency is important. Trying to achieve the same using legacy NLP methods and tools (for instance, Google DialogFlow) requires a lot of training and entity creations. By combining the power of LLMs with the rigor of Pydantic schemas, developers can overcome this challenge. As a result, the natural language generation capabilities of LLMs can be transformed into tools that provide both flexibility and precision.

Though all popular LLMs currently support the functionality to provide a structured output, the approach discussed in this blog provides a better methodology and is easier to maintain. Rather than providing a detailed prompt for each individual key value pair for the JSON output, this approach reduces the required effort and time as each key value pair can have their own associated description, type and default values specified at a minimum. 

As the role of LLMs grows, so too will the importance of ensuring that their outputs align with the structured data needs of real-world systems. By using a framework such as Pydantic to enforce strict schema validation, the door is now open to more robust, dependable AI-driven applications.


## References

- [Chat2plot GitHub Repository](https://github.com/nyanp/chat2plot)
- [OpenAI API Documentation](https://openai.com/blog/openai-api)
