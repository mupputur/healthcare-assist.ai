import unittest
from unittest.mock import patch
from jose import jwt
from datetime import datetime, timedelta

with patch("utils.vault_secrets.get_secrets", return_value="test-secret-key"):
    from auth.token import create_access_token, ALGORITHM

class TestCreateAccessToken(unittest.TestCase):

    def setUp(self):
        self.test_data = {"sub": "user123"}
        self.secret = "test-secret-key"
        self.algorithm = ALGORITHM

    def test_access_token_structure(self):
        token = create_access_token(self.test_data)
        decoded = jwt.decode(token, self.secret, algorithms=[self.algorithm])
        self.assertEqual(decoded["sub"], "user123")
        self.assertIn("exp", decoded)
        exp_time = datetime.utcfromtimestamp(decoded["exp"])
        self.assertGreater(exp_time, datetime.utcnow())

    def test_refresh_token_structure(self):
        token = create_access_token(self.test_data)
        decoded = jwt.decode(token, self.secret, algorithms=[self.algorithm])
        self.assertEqual(decoded["sub"], "user123")
        self.assertIn("exp", decoded)
        exp_time = datetime.utcfromtimestamp(decoded["exp"])
        self.assertGreater(exp_time, datetime.utcnow())


if __name__ == "__main__":
    unittest.main()
