import requests

USR = "shubhamrindhe";
user = "https://api.github.com/users/"+USR+""
repositories = "https://api.github.com/users/"+USR+"/repos"

print(requests.get(user))
print(requests.get(repositories))
