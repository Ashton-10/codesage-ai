import json
import traceback

from google import genai
from app.core.settings import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

MODEL = "models/gemini-3.5-flash"


def review_code(language: str, code: str):
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

    try:
        print("=" * 60)
        print("Using model:", MODEL)

        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
        )

        print("\n========== RAW RESPONSE ==========")
        print(response)
        print("==================================")

        text = response.text

        print("\n========== RESPONSE TEXT ==========")
        print(text)
        print("===================================")

        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        elif text.startswith("```"):
            text = text.replace("```", "").strip()

        data = json.loads(text)

        print("\n========== PARSED JSON ==========")
        print(data)
        print("=================================")

        return data

    except Exception:
        print("\n========== FULL TRACEBACK ==========\n")
        traceback.print_exc()
        raise