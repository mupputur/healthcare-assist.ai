import json

def get_secrets():
    try:
        with open('.vault.json') as sfile:
            resp = json.load(sfile)  # note: json.load, not json.loads
            return resp.get('secret_key')
    except Exception:
        raise Exception("Unable to get the secrets")
