import json
import time

from google import genai
from app.core.settings import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

MODELS = [
    "models/gemini-3.5-flash",
    "models/gemini-3.1-flash-lite",
    "models/gemini-2.0-flash-lite",
]


def review_code(language: str, code: str):
    # Limit very large inputs
    code = code[:20000]

    prompt = f"""
You are a senior software engineer.

Analyze the following {language} code.

Return ONLY valid JSON.

The JSON format MUST be:

{{
    "score": 95,
    "bugs": 2,
    "security_score": 9,
    "performance_score": 8,
    "quality_score": 9,
    "review": "A detailed code review explaining bugs, code quality, performance, security issues and suggestions."
}}

Code:

{code}
"""

    last_error = None

    for model in MODELS:

        print("=" * 60)
        print("Trying:", model)

        for attempt in range(3):

            try:

                response = client.models.generate_content(
                    model=model,
                    contents=prompt,
                )

                text = response.text.strip()

                if text.startswith("```json"):
                    text = text.replace("```json", "").replace("```", "").strip()
                elif text.startswith("```"):
                    text = text.replace("```", "").strip()

                data = json.loads(text)

                print("Success with", model)

                return data

            except Exception as e:

                last_error = e

                print(f"{model} failed (attempt {attempt + 1}/3)")
                print(e)

                if "503" in str(e):
                    print("Gemini busy... waiting 5 seconds")
                    time.sleep(5)
                    continue

                if "429" in str(e):
                    print("Rate limit hit... waiting 10 seconds")
                    time.sleep(10)
                    continue

                break

    raise Exception(
        f"All Gemini models failed.\nLast error: {last_error}"
    )