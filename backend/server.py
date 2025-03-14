import http.server
import io
import json
import os
import random
import socketserver
import traceback
from contextlib import redirect_stdout
from copy import deepcopy
from http import HTTPStatus
from typing import Any, Dict, List

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
SYSTEM_INSTRUNCTION: str = """\
<references>
Taxonomy of Common Bug Patterns generated by AI in Programming Problems:
1.  **Misinterpretation:** The generated code deviates from the intention of the prompt, failing to capture the specified task.
2.  **Syntax Error:** The code contains syntax errors, like missing parentheses or semicolons.
3.  **Silly Mistake:** The code includes redundant conditions or unnecessary casting, potentially leading to future bugs.
4.  **Prompt-biased code:** The code excessively relies on provided examples or specific prompt terms, limiting its general applicability and correctness.
5.  **Missing Corner Case:** The code operates correctly in most scenarios but fails to handle specific corner cases.
6.  **Wrong Input Type:** A correct function call is made, but it's supplied with an *input* of the wrong data type.
7.  **Hallucinated Object:** The code attempts to use a non-existent or undefined object.
8.  **Wrong Attribute:** The code references an incorrect or non-existent attribute of an object or module.
9.  **Incomplete Generation:** No code is generated, or what is produced is incomplete (e.g., a `pass` statement or empty function).
10. **Non-Prompted Consideration (NPC):** The code includes statements unrelated to the prompt's task, causing errors.
</references>

Below is a Python programming problem. 
Reason about **what kind of bugs AI may make** while coming up with solutions for the given problem.
Next, come up with exactly 3 buggy implementations, their corrected versions, and explanations for the bugs.
In addition to the Problem, the user will provide a difficulty level for bug detection in Japanese, chosen from "やさしい" (easy to find bugs), "ちょっとわかりにくい" (slightly difficult to find bugs), or "かなりわかりにくい" (very difficult to find bugs). The 3 buggy implementations you generate should reflect the chosen difficulty level of bug detection. The code itself does not need to be intrinsically complex, but the bugs should be designed to be easily, moderately, or very difficult to identify based on the chosen level.
Format it as a JSON object, where each object contains the following keys: ‘code’, ‘fixed_code’, and ‘explanation’:
{
"reasoning": "Reasoning about the bugs",
"content":
[{ "code": ...,
"fixed_code": ...,
"explanation": ... }]
}
Implement only this function with various bugs that students may make, incorporating the bugs you reasoned about. Each program should contain only one bug. Make them as diverse as possible. The bugs should not lead to the program not compiling or hanging. Do not add comments.  Do not forget to first reason about possible bugs. 
Make sure that the function name is `main`.
"""

HINT_SYSTEM_INSTRUCTION: str = """\
You are a helpful programming tutor. Your task is to provide a hint for a student who is working on a programming challenge.

Based on the challenge description, the student's code, and the test results, provide a helpful hint that guides the student towards the solution without giving away the complete answer.

Your hint should:
1. Identify potential issues in the student's code
2. Suggest a direction for improvement
3. Explain relevant concepts if necessary
4. Be encouraging and supportive

Consider the following information:
- Challenge instructions: What the student is trying to accomplish
- Example test cases: Examples of expected inputs and outputs
- Current code: The student's current implementation
- Test results: Which tests are passing and which are failing

Format your response as plain text in Japanese. Keep your hint concise (3-5 sentences) and focused on the most critical issue.
Do not use Markdown formatting.
Do not provide a complete solution or rewrite their entire code.
"""


class TestHandler(http.server.SimpleHTTPRequestHandler):
    """
    A handler that provides:
      - /api/health                (GET)
      - /api/run-python            (POST)
      - /api/generate-code         (POST)
      - /api/generate-hint         (POST)
      - CORS preflight handling    (OPTIONS)
    """

    def do_GET(self) -> None:
        if self.path == "/api/health":
            self.send_json_response({"status": "OK"})
            return
        return super().do_GET()

    def do_POST(self) -> None:
        if self.path == "/api/run-python":
            data_run: Dict[str, Any] = self.parse_json_from_request()
            code: str = data_run.get("code", "")
            test_cases: List[Dict[str, Any]] = data_run.get("testCases", [])

            self.send_sse_headers()
            self.run_tests_with_sse(code, test_cases)
            return

        elif self.path == "/api/generate-code":
            data_gen: Dict[str, Any] = self.parse_json_from_request()
            challenge = data_gen.get("challenge", "")
            difficulty = data_gen.get("difficulty", "")
            prompt = f"""\
Problem description:
{challenge}

Difficulty level:
{difficulty}
            """
            try:
                result: Dict[str, str] = self.generate_code_from_prompt(prompt)
                self.send_json_response(result)
            except json.JSONDecodeError as e:
                self.send_json_response({"error": str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR)
            return

        elif self.path == "/api/generate-hint":
            data: Dict[str, Any] = self.parse_json_from_request()
            code: str = data.get("code", "")
            instructions: str = data.get("instructions", "")
            examples: str = data.get("examples", "")
            test_results: List[Dict[str, Any]] = data.get("testResults", [])

            try:
                hint: str = self.generate_hint(code, instructions, examples, test_results)
                self.send_json_response({"hint": hint})
            except Exception as e:
                print(e)
                self.send_json_response({"error": str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR)
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Not Found")

    def do_OPTIONS(self) -> None:
        """
        CORS preflight request handler
        """
        self.send_response(HTTPStatus.NO_CONTENT)
        self.set_cors_headers()
        self.end_headers()

    # ---------------------------
    # Common utility / helper methods
    # ---------------------------

    def parse_json_from_request(self) -> Dict[str, Any]:
        """
        POSTデータを読み取り、JSONオブジェクトとして返す
        """
        content_length: int = int(self.headers.get("Content-Length", 0))
        post_data: bytes = self.rfile.read(content_length)
        return json.loads(post_data.decode("utf-8"))

    def send_json_response(self, data: Dict[str, Any], status: int = HTTPStatus.OK) -> None:
        """
        JSON形式のレスポンスを返す
        """
        self.send_response(status)
        self.set_cors_headers()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        response: str = json.dumps(data)
        self.wfile.write(response.encode("utf-8"))

    def send_sse_headers(self) -> None:
        """
        SSE (Server-Sent Events) 向けのヘッダを送信する
        """
        self.send_response(HTTPStatus.OK)
        self.set_cors_headers()
        self.send_header("Content-Type", "text/event-stream")
        self.end_headers()

    def set_cors_headers(self) -> None:
        """
        CORS用の共通ヘッダを設定する
        """
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    # ---------------------------
    # /api/generate-code endpoint logic
    # ---------------------------

    def generate_code_from_prompt(self, prompt: str) -> Dict[str, str]:
        """
        受け取ったプロンプトに応じてコードと説明を生成する処理
        """
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[prompt],
            config=types.GenerateContentConfig(
                temperature=0.0,
                system_instruction=SYSTEM_INSTRUNCTION,
                response_mime_type="application/json",
            ),
        )
        print(response.text)

        response_json: Dict[str, Any] = json.loads(response.text)
        selected_idx: int = random.randint(0, len(response_json["content"]) - 1)
        generated_code: str = response_json["content"][selected_idx]["code"]
        explanation: str = response_json["content"][selected_idx]["explanation"]
        return {"code": generated_code, "explanation": explanation}
        
    def generate_hint(self, code: str, instructions: str, examples: str, test_results: List[Dict[str, Any]]) -> str:
        """
        コード、課題の説明、例、テスト結果に基づいてヒントを生成する
        """
        # テスト結果をLLM用にフォーマット
        test_results_text = ""
        for i, result in enumerate(test_results):
            status = "成功" if result.get("status") == "success" else "失敗"
            test_results_text += f"テストケース {i+1}: {status}\n"
            test_results_text += f"メッセージ: {result.get('message', '')}\n\n"
        
        # LLM用のプロンプトを作成
        prompt = f"""
課題:
{instructions}

例:
{examples}

学生のコード:
{code}

テスト結果:
{test_results_text}
"""
        
        # Gemini APIを使用してヒントを生成
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[prompt],
            config=types.GenerateContentConfig(
                temperature=0.0,
                system_instruction=HINT_SYSTEM_INSTRUCTION,
            ),
        )
        return response.text

    # ---------------------------
    # /api/run-python endpoint logic
    # ---------------------------
    def run_tests_with_sse(self, code: str, test_cases: List[Dict[str, Any]]) -> None:
        """
        送信されてきた test_cases を使ってテスト
        """
        if "GEMINI_API_KEY" in code:
            error_response = json.dumps({
                "status": "forbidden",
                "message": "Execution halted: Code contains forbidden string 'GEMINI_API_KEY'."
            })
            self.write_sse_data(error_response)
            return
        for i, test_case in enumerate(test_cases):
            result: Dict[str, Any] = self.run_single_test_case(code, test_case)
            response: str = json.dumps({
                "status": "ok",
                "testCase": i + 1,
                **result,
            })
            self.write_sse_data(response)

    def run_single_test_case(self, code: str, test_case: Dict[str, Any]) -> Dict[str, Any]:
        stdout: io.StringIO = io.StringIO()
        try:
            namespace: Dict[str, Any] = {}
            exec(code, namespace)
            solution = namespace.get("main")
            if not solution:
                return {
                    "status": "error",
                    "message": 'Function "main" not found in code',
                }
            with redirect_stdout(stdout):
                input_data = deepcopy(test_case["input"])
                result = solution(*input_data)
            expected = test_case["expected"]
            if result == expected and str(result) == str(expected):
                return {
                    "status": "success",
                    "message": f"Input:\n{test_case['input']}\n\nExpected:\n{expected}\n\nGot:\n{result}",
                }
            else:
                return {
                    "status": "error",
                    "message": f"Input:\n{test_case['input']}\n\nExpected:\n{expected}\n\nGot:\n{result}",
                }
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error:\n\n{str(e)}\n{traceback.format_exc()}",
            }

    def write_sse_data(self, data: str) -> None:
        """
        SSE形式でクライアントへデータを送信する
        """
        self.wfile.write(f"data: {data}\n\n".encode("utf-8"))
        self.wfile.flush()


if __name__ == "__main__":
    PORT: int = 8000
    with socketserver.TCPServer(("", PORT), TestHandler) as httpd:
        print(f"Server running on port {PORT}")
        httpd.serve_forever()
