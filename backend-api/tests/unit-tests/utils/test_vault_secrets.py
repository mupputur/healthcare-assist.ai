import unittest
from unittest.mock import mock_open, patch
import json
from utils.vault_secrets import get_secrets

class TestGetSecrets(unittest.TestCase):

    @patch("builtins.open", new_callable=mock_open, read_data='{"secret_key": "test-key-123"}')
    def test_get_secrets_success(self, mock_file):
        secret = get_secrets()
        self.assertEqual(secret, "test-key-123")
        mock_file.assert_called_once_with('.vault.json')

if __name__ == "__main__":
    unittest.main()
