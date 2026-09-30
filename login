cURL Command:
curl.exe -s -X POST "http://localhost:5000/api/auth/login" -H "Content-Type: application/json" --data-binary "@D:\giftlink\login-body.json"

Output:
{"user":{"_id":"6abd54a3875c3e96dafb1ac5","name":"GiftLink Login Test","email":"giftlinklogin2026@example.com"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYmQ1NGEzODc1YzNlOTZkYWZiMWFjNSIsImVtYWlsIjoiZ2lmdGxpbmtsb2dpbjIwMjZAZXhhbXBsZS5jb20iLCJpYXQiOjE3OTA3OTI5MDYsImV4cCI6MTc5MTM5NzcwNn0.hHQDM2Z9SQt9M21WBN1D8Bg3yx1ieZmxdJu7AmxEQgI"}
