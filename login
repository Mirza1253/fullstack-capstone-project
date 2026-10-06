cURL command:
curl.exe -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" --data-binary "@login-body.json"

Output:
{"user":{"_id":"6ac50e753b39d267f8fac9a2","name":"Test User 2","email":"testuser2026b@example.com"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYzUwZTc1M2IzOWQyNjdmOGZhYzlhMiIsImVtYWlsIjoidGVzdHVzZXIyMDI2YkBleGFtcGxlLmNvbSIsImlhdCI6MTc5MTI5OTQzNywiZXhwIjoxNzkxOTA0MjM3fQ.gHabSl0x4anWukZ0rAUZQHqeUDn3fz0Av51q5aV1gsQ"}
